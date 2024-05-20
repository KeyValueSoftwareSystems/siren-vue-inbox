<template>
  <div data-testid="provider-container" :style="{ height: '100%' } ">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { provide, ref, defineProps, watch } from 'vue';
import { Siren } from '@sirenapp/js-sdk';
import type { InitConfigType, NotificationsApiResponse, SirenErrorType, UnviewedCountApiResponse } from '@sirenapp/js-sdk/dist/esm/types';
import PubSub from 'pubsub-js';

import type { SirenProviderConfigProps } from '../types';
import { VerificationStatus, AUTHENTICATION_FAILED, EventType, MAXIMUM_RETRY_COUNT, eventTypes, events } from '../utils/constants';
import { logger } from '../utils/commonUtils';

const props = defineProps<{
  config: SirenProviderConfigProps
}>();

const siren = ref<Siren | null>(null);
const verificationStatus = ref<VerificationStatus>(VerificationStatus.PENDING);
let retryCount = 0;

const onEventReceive = (response: NotificationsApiResponse
  | UnviewedCountApiResponse, eventType: EventType): void => {
  if (eventType === EventType.NOTIFICATION) {
    const newNotifications = (response as NotificationsApiResponse)?.data || [];

    logger.info(`new notifications : ${JSON.stringify(newNotifications)}`);
    PubSub.publish(events.NOTIFICATION_LIST_EVENT, JSON.stringify({
      newNotifications, action: eventTypes.NEW_NOTIFICATIONS
    }));
  }

  if (eventType === EventType.UNVIEWED_COUNT) {
    const totalUnviewed = (response as UnviewedCountApiResponse)?.data?.totalUnviewed || 0;

    logger.info(`unviewed notification count : ${totalUnviewed}`);
    PubSub.publish(events.NOTIFICATION_COUNT_EVENT,
      JSON.stringify({
        unviewedCount: totalUnviewed,
        action: eventTypes.UPDATE_NOTIFICATIONS_COUNT
      }));
  }
};

const onStatusChange = (status: VerificationStatus) => {
  verificationStatus.value = status;
};

const actionCallbacks = { onEventReceive, onStatusChange };

const getDataParams = () => ({
  token: props.config.userToken,
  recipientId: props.config.recipientId,
  // eslint-disable-next-line no-use-before-define
  onError: retryVerification,
  actionCallbacks
});

const initialize = async (): Promise<void> => {
  const dataParams: InitConfigType = getDataParams();
  const sirenValue = new Siren(dataParams);

  siren.value = sirenValue;
  // Reset verification status when token is changed
  verificationStatus.value = VerificationStatus.PENDING;
};

const retryVerification = (error: SirenErrorType) => {
  if (error.Code === AUTHENTICATION_FAILED && retryCount < MAXIMUM_RETRY_COUNT)
    setTimeout(() => {
      // To avoid retry verification in case of token or recipient id change
      if (verificationStatus.value !== VerificationStatus.SUCCESS) {
        initialize();
        retryCount++;
      }
    }, 5000);
};

const stopRealTimeFetch = (): void => {
  siren.value?.stopRealTimeFetch(EventType.NOTIFICATION);
  siren.value?.stopRealTimeFetch(EventType.UNVIEWED_COUNT);
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
  } else {
    verificationStatus.value = VerificationStatus.FAILED;
  }
  if (retryCount > MAXIMUM_RETRY_COUNT) stopRealTimeFetch();
}, { immediate: true });

provide<Ref<Siren>>('siren', siren as Ref<Siren>);
provide<Ref<VerificationStatus>>('verificationStatus', verificationStatus as Ref<VerificationStatus>);

</script>
