<template>
  <div class="siren-sdk-notification-icon-container" :onClick="handleNotification"
    data-testid="notification-icon-container">
    <slot name="notificationIcon">
      <BellIcon :size="String(styles.notificationIcon.size)" :stroke="darkMode
    ? COLORS.dark.notificationIcon
    : COLORS.light.notificationIcon" />
    </slot>
    <div v-if="!hideBadge && unViewedCount > 0" class="siren-sdk-notificationIcon-badge-container" :style="!isModalOpen && styles.badgeStyle
    ">
      <div :style="styles.badgeTextStyle">
        {{ unViewedCount > MAXIMUM_UNVIEWED_COUNT_SHOWN ? `${MAXIMUM_UNVIEWED_COUNT_SHOWN}+` : unViewedCount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import {
  defineProps,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue';
import type { Siren } from '@sirenapp/js-sdk';
import PubSub from 'pubsub-js';

import type { SirenStyleProps } from '../types';
import {
  EventType,
  eventTypes,
  events,
  COLORS,
  MAXIMUM_UNVIEWED_COUNT_SHOWN
} from '../utils/constants';
import BellIcon from './BellIcon.vue';

import '../styles/icon.css';

const props = defineProps<{
  handleNotification: (event: any) => void;
  darkMode: boolean;
  styles: SirenStyleProps;
  hideBadge: boolean;
  isModalOpen: boolean;
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
  siren?.value?.stopRealTimeFetch(EventType.UNVIEWED_COUNT);
};

const startRealTimeDataFetch = () => {
  cleanUp();
  siren?.value?.startRealTimeFetch({ eventType: EventType.UNVIEWED_COUNT });
};

const getUnViewedCount = async (): Promise<void> => {
  if (!siren?.value) return;
  try {
    const response = await siren?.value?.fetchUnviewedNotificationsCount();

    startRealTimeDataFetch();
    if (response && response.error) return;
    if (response?.data)
      unViewedCount.value = response?.data?.unviewedCount || 0;
  } catch (er) {
    //  handle error if needed
  }
};

onMounted(() => {
  if (!props.hideBadge)
    PubSub.subscribe(
      events.NOTIFICATION_COUNT_EVENT,
      notificationCountSubscriber
    );
});

onMounted(() => {
  if (!props.hideBadge) startRealTimeDataFetch();
});

watch(
  () => siren?.value,
  () => {
    // Check isModalOpen in case of multiple validations of token
    if (!props.hideBadge && !props.isModalOpen) getUnViewedCount();
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  cleanUp();
});
</script>
