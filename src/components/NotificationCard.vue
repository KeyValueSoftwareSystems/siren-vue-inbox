<template>
  <div :style="cardContainerStyle" :class="`${cardProps?.hideAvatar
    ? 'siren-sdk-hide-avatar-card-container'
    : 'siren-sdk-card-container'} siren-sdk-card-common-container ${deleteAnimation}` " @click="handleNotificationCardClick"
    @keydown="handleNotificationCardClick">
    <img :src="props?.notification?.message?.avatar?.imageUrl ?? defaultAvatar" alt="avatar" class="siren-sdk-card-avatar" :style="styles.cardIconRound"
      @click="handleAvatarClick" @keydown="handleAvatarClick" v-if="!cardProps?.hideAvatar" />
    <div class="siren-sdk-card-content-wrapper">
      <div :style="styles.cardTitle" class="siren-sdk-card-text-break">
        {{ props.notification?.message?.header }}
      </div>
      <div :style="styles.cardSubTitle" class="siren-sdk-card-text-break">
        {{ props.notification?.message?.subHeader }}
      </div>
      <div :style="styles.cardDescription" class="siren-sdk-card-text-break siren-sdk-card-msg-body">
        {{ props?.notification?.message?.body }}
      </div>
      <div class="siren-sdk-card-date-container">
        <TimerIcon :fill="styles?.timerIcon?.color" :size="String(styles?.timerIcon?.size)" />
        <div :style="styles.dateStyle" class="siren-sdk-card-date-style">
          {{ generateElapsedTimeText(notification?.createdAt) }}
        </div>
      </div>
    </div>
    <div class="siren-sdk-delete-button" @click="handleDelete" @keydown="handleDelete">
      <CloseIcon :fill="styles?.deleteIcon?.color" :size="String(styles?.deleteIcon?.size)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { defineProps, watch, ref } from 'vue';

import type { NotificationCardProps } from '../types';
import { generateElapsedTimeText } from '../utils/commonUtils';
import CloseIcon from './CloseIcon.vue';
import TimerIcon from './TimerIcon.vue';
import defaultAvatarDark from '../assets/dark/defaultAvatarDark.png';
import defaultAvatarLight from '../assets/light/defaultAvatarLight.png';

import '../styles/card.css';
import useSiren from '../composables/useSiren';

const props = defineProps<NotificationCardProps>();

const deleteAnimation = ref<string>('');

const {
  markAsReadById
} = useSiren();

let cardContainerStyle: CSSProperties;

const defaultAvatar: string = props?.darkMode ? defaultAvatarDark : defaultAvatarLight;

const handleDelete = (event: MouseEvent | KeyboardEvent) => {
  deleteAnimation.value = 'siren-sdk-delete-animation';

  setTimeout(() => {
    props.deleteById(props.notification.id);
  }, 200);

  event.stopPropagation();
};

const handleNotificationCardClick = () => {
  if (props?.onCardClick) props.onCardClick(props.notification);
  if (!props?.cardProps?.disableAutoMarkAsRead) markAsReadById(props.notification.id);
};

const handleAvatarClick = (event: MouseEvent | KeyboardEvent) => {
  if (props?.cardProps?.onAvatarClick)
    props?.cardProps?.onAvatarClick(props?.notification);
  event.stopPropagation();
};

watch(() => props?.notification?.isRead, () => {
  cardContainerStyle = props?.notification?.isRead
    ? {
      ...props?.styles.defaultCardContainer,
      borderLeft: '4px transparent solid'
    }
    : {
      ...props?.styles.defaultCardContainer,
      borderLeft: `4px ${props.styles.activeCardMarker?.border} solid`,
      backgroundColor: props.styles.activeCardMarker?.backgroundColor
    };
}, { immediate: true });

</script>
