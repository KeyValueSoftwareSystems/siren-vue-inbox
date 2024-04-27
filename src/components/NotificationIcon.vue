<template>
  <div
    class="siren-sdk-notification-icon-container"
    :onClick="handleNotification"
  >
    <slot name="notification-icon">
      <BellIcon
      :size="String(styles.notificationIcon.size)"
      :stroke=" darkMode
              ? COLORS.dark.notificationIcon
              : COLORS.light.notificationIcon" />
    </slot>
    <div
      class="siren-sdk-notificationIcon-badge-container"
      :style="
        badgeType === BadgeType.DEFAULT && unViewedCount > 0
          ? styles.badgeStyle
          : {
              width: 0,
              height: 0,
              overflow: 'hidden'
            }
      "
    >
      <div :style="styles.badgeTextStyle">
        {{ unViewedCount > 99 ? "99+" : unViewedCount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
Ref } from 'vue';
import {
  defineProps,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue';
import PubSub from 'pubsub-js';
import type { Siren } from 'test_notification';

import type { SirenStyleProps } from '../types';
import { BadgeType, EventType, eventTypes, events, COLORS } from '../utils/constants';
import BellIcon from './BellIcon.vue';

import '../styles/icon.css';

defineProps<{
  handleNotification: (event: any) => void;
  badgeType: BadgeType;
  darkMode: boolean;
  styles: SirenStyleProps;
}>();

const siren: Ref<Siren> = inject('siren') as Ref<Siren>;

const unViewedCount = ref<number>(0);

const notificationCountSubscriber = async (
  _type: string,
  dataString: string
) => {
  const data = await JSON.parse(dataString);

  if (data.action === eventTypes.UPDATE_NOTIFICATIONS_COUNT)
    unViewedCount.value = data.unviewedCount;
};

const cleanUp = () => {
  siren.value?.stopRealTimeFetch(EventType.UNVIEWED_COUNT);
};

const startRealTimeDataFetch = () => {
  cleanUp();
  siren.value?.startRealTimeFetch({ eventType: EventType.UNVIEWED_COUNT });
};

const getUnViewedCount = async (): Promise<void> => {
  if (!siren.value) return;
  try {
    const response = await siren.value?.fetchUnviewedNotificationsCount();

    startRealTimeDataFetch();
    if (response && response.error) return;
    if (response?.data)
      unViewedCount.value = response?.data?.unviewedCount || 0;
  } catch (er) {
    //  handle error if needed
  }
};

onMounted(() => {
  PubSub.subscribe(
    events.NOTIFICATION_COUNT_EVENT,
    notificationCountSubscriber
  );
});

onMounted(() => {
  startRealTimeDataFetch();
});

watch(
  () => siren.value,
  () => {
    getUnViewedCount();
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  cleanUp();
});
</script>
