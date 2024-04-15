<template>
  <div
    class="siren-sdk-notification-icon-container"
    :onClick="handleNotification"
  >
    <slot name="notification-icon">
      <BellIcon :stroke="styles.notificationIcon?.color" />
    </slot>
    <div
      class="siren-sdk-notificationIcon-badge-container"
      :style="
        badgeType === BadgeType.DEFAULT && unViewedCount > 0
          ? styles.badgeStyle
          : {
              width: 0,
              height: 0,
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
import { BadgeType, eventTypes, events } from '../utils/constants';
import BellIcon from './BellIcon.vue';

import '../styles/icon.css';

defineProps<{
  handleNotification: (event: any) => void;
  badgeType: BadgeType;
  darkMode: boolean;
  styles: SirenStyleProps;
}>();

const siren: Siren | undefined = inject('siren');

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
  siren?.stopRealTimeUnviewedCountFetch();
};

const startRealTimeDataFetch = () => {
  cleanUp();
  siren?.startRealTimeUnviewedCountFetch();
};

const getUnViewedCount = async (): Promise<void> => {
  if (!siren) return;
  try {
    const response = await siren.fetchUnviewedNotificationsCount();

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
  () => siren,
  () => {
    getUnViewedCount();
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  cleanUp();
});
</script>
