<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, defineProps, watch } from 'vue';
import { Siren } from 'test_notification';
import type { InitConfigType, NotificationsApiResponse, SirenErrorType, UnviewedCountApiResponse } from 'test_notification/dist/esm/types';
import PubSub from 'pubsub-js';

import type { SirenProviderConfigProps } from '../types';
import { TOKEN_VERIFICATION_FAILED, eventTypes, events } from '../utils/constants';
import { logger } from '../utils/commonUtils';

const props = defineProps<{
  config: SirenProviderConfigProps
}>();

const siren = ref<Siren | null>(null);
let retryCount = 0;

const onUnViewedCountReceived = (response: UnviewedCountApiResponse): void => {
  const totalUnviewed = response?.data?.totalUnviewed;

  logger.info(`unviewed notification count : ${totalUnviewed}`);
  const payload = {
    unviewedCount: totalUnviewed,
    action: eventTypes.UPDATE_NOTIFICATIONS_COUNT
  };

  PubSub.publish(events.NOTIFICATION_COUNT_EVENT, JSON.stringify(payload));
};

const onNotificationReceived = (response: NotificationsApiResponse): void => {
  if (response?.data?.length) {
    logger.info(`new notifications : ${JSON.stringify(response?.data)}`);
    const payload = { newNotifications: response?.data, action: eventTypes.NEW_NOTIFICATIONS };

    PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(payload));
  }
};

const actionCallbacks = { onUnViewedCountReceived, onNotificationReceived };

const getDataParams = () => ({
    token: props.config.userToken,
    recipientId: props.config.recipientId,
    // eslint-disable-next-line no-use-before-define
    onError: retryVerification,
    actionCallbacks
  });

const initialize = (): void => {
  const dataParams: InitConfigType = getDataParams();
  const sirenValue = new Siren(dataParams);

  siren.value = (sirenValue);
};

  const retryVerification = (error: SirenErrorType) => {
  if (error.Code === TOKEN_VERIFICATION_FAILED && retryCount < 3)
    setTimeout(() => {
      initialize();
      retryCount++;
    }, 5000);
};

const stopRealTimeFetch = (): void => {
  siren.value?.stopRealTimeNotificationFetch();
  siren.value?.stopRealTimeUnviewedCountFetch();
};

const sendResetDataEvents = () => {
  const updateCountPayload = {
    action: eventTypes.RESET_NOTIFICATIONS_COUNT
  };
  const updateNotificationPayload = {
    action: eventTypes.RESET_NOTIFICATIONS
  };

  PubSub.publish(events.NOTIFICATION_COUNT_EVENT, JSON.stringify(updateCountPayload));
  PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify(updateNotificationPayload));
};

watch(() => props?.config, () => {
  if (props.config?.recipientId && props.config?.userToken) {
    stopRealTimeFetch();
    sendResetDataEvents();
    initialize();
  }
}, { immediate: true });

provide<Siren>('siren', siren.value as Siren);

</script>
