<template>
    <div :style="cardContainerStyle"
        :class="cardProps?.hideAvatar ? 'siren-sdk-hide-avatar-card-container' : 'siren-sdk-card-container'"
        @click="onNotificationCardClick && onNotificationCardClick(notification)">
        <img :src="notification?.message?.avatar?.imageUrl ?? defaultAvatar" alt="avatar" :style="styles.cardIconRound"
            v-if="!cardProps?.hideAvatar" />
        <div class="siren-sdk-card-content-wrapper">
            <div :style="styles.cardTitle" class="siren-sdk-card-text-break">{{ props.notification?.message?.header }}
            </div>
            <div :style="styles.cardDescription" class="siren-sdk-card-text-break">{{
        props.notification?.message?.subHeader }}</div>
            <div :style="styles.cardDescription" class="siren-sdk-card-text-break siren-sdk-card-msg-body">
                {{ props?.notification?.message?.body }}</div>
            <div class="siren-sdk-card-date-container">
                <TimerIcon :fill="styles?.timerIcon?.color" :size="String(styles?.timerIcon?.size)" />
                <div :style="styles.dateStyle">
                    {{ generateElapsedTimeText(notification?.createdAt) }}
                </div>
            </div>
        </div>
        <div class="siren-sdk-delete-button" @click="handleDelete">
            <CloseIcon :fill="styles?.deleteIcon?.color" :size="String(styles?.deleteIcon?.size)" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { CSSProperties, defineProps } from 'vue';

import { NotificationCardProps } from '../types';
import { generateElapsedTimeText } from '../utils/commonUtils';
import CloseIcon from '../components/CloseIcon.vue';
import TimerIcon from '../components/TimerIcon.vue';
import defaultAvatar from '../assets/defaultAvatar.svg';

import '../styles/card.css';

const props = defineProps<NotificationCardProps>();

const cardContainerStyle: CSSProperties = props?.notification?.isRead ? {
    ...props?.styles.defaultCardContainer, borderLeft: "4px transparent solid"
} : {
    ...props?.styles.defaultCardContainer, borderLeft: `4px ${props.styles.activeCardMarker?.border} solid`,
    backgroundColor: props.styles.activeCardMarker?.backgroundColor
}

const handleDelete = () => {
    props.deleteNotificationById(props.notification.id);
}

</script>