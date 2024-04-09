<template>
    <div class="siren-sdk-notification-icon-container" :onClick="handleNotification">
        <slot name="notification-icon">
            <BellIcon :stroke="styles.notificationIcon?.color" />
        </slot>
        <div class="siren-sdk-notificationIcon-badge-container" :style="badgeType === BadgeType.DEFAULT && unViewedCount > 0 ?
        styles.badgeStyle : {
            width: 0, height: 0
        }">
            <div :style="styles.badgeTextStyle">
                {{ unViewedCount > 99 ? '99+' : unViewedCount }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

import { SirenStyleProps } from '../types';
import { BadgeType } from '../utils/constants';
import BellIcon from '../components/BellIcon.vue';

import '../styles/icon.css';

defineProps<{
    handleNotification: (event: any) => void;
    badgeType: BadgeType;
    darkMode: boolean;
    styles: SirenStyleProps
}>()


const unViewedCount = ref<number>(0);

</script>