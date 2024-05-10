<template>
  <div :style="cardContainerStyle" :class="`${cardProps?.hideAvatar
    ? 'siren-sdk-hide-avatar-card-container'
    : 'siren-sdk-card-container'} siren-sdk-card-common-container ${deleteAnimation}`"
    @click="handleNotificationCardClick" @keydown="handleNotificationCardClick"
    data-testid="notification-card-container" :aria-label="`siren-notification-card-${notification.id}`">
    <div :style="{
    ...styles.cardIconRound,
    backgroundImage: `url(${props?.notification?.message?.avatar?.imageUrl || defaultAvatar})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    ...(props?.cardProps?.onAvatarClick && { cursor: 'pointer' }),
  }" @click="handleAvatarClick" @keydown="handleAvatarClick" v-if="!cardProps?.hideAvatar"
      data-testid="avatar-container" :aria-label="`siren-notification-avatar-${notification.id}`" />
    <div class="siren-sdk-card-content-wrapper">
      <div :style="styles.cardTitle" class="siren-sdk-card-title">
        {{ props.notification?.message?.header }}
      </div>
      <div :style="styles.cardSubTitle" class="siren-sdk-card-subtitle">
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
    <div class="siren-sdk-delete-button" @click="handleDelete" @keydown="handleDelete"
      data-testid="delete-notification-button" v-if="!cardProps?.hideDelete"
      :aria-label="`siren-notification-delete-${notification.id}`">
      <CloseIcon :stroke="styles?.deleteIcon?.color" :size="String(styles?.deleteIcon?.size)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { defineProps, watch, ref } from 'vue';
import PubSub from 'pubsub-js';

import type { NotificationCardProps } from '../types';
import { generateElapsedTimeText } from '../utils/commonUtils';
import { eventTypes, events } from '../utils/constants';
import CloseIcon from './CloseIcon.vue';
import TimerIcon from './TimerIcon.vue';
import useSiren from '../composables/useSiren';
import defaultAvatarDark from '../assets/dark/defaultAvatarDark.png';
import defaultAvatarLight from '../assets/light/defaultAvatarLight.png';

import '../styles/card.css';

const props = defineProps<NotificationCardProps>();

const deleteAnimation = ref<string>('');

const {
  markAsReadById
} = useSiren();

let cardContainerStyle: CSSProperties;

const defaultAvatar: string = props?.darkMode ? defaultAvatarDark : defaultAvatarLight;

const handleDelete = async (event: MouseEvent | KeyboardEvent): Promise<void> => {
  event.stopPropagation();
  const isSuccess = await props.deleteById(props.notification.id, false);

  if (isSuccess) {
    deleteAnimation.value = 'siren-sdk-delete-animation';

    setTimeout(() => {
      const payload = { id: props.notification.id, action: eventTypes.DELETE_ITEM };

      PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
    }, 200);
  }
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
