<template>
  <div :class="windowViewOnly ? 'siren-sdk-panel-container' : 'siren-sdk-panel-modal'
    " :style="panelStyle">
    <slot name="customHeader" v-if="!headerProps.hideHeader">
      <HeaderComponent :title="headerProps.title ?? DEFAULT_WINDOW_TITLE"
        :enableClearAll="!isEmptyArray(notificationsContent) && !isLoading"
        :handleClearAllNotification="handleClearAllNotification"
        :styles="styles" :windowViewOnly="windowViewOnly"
        :hideClearAll="headerProps.hideClearAll ?? false" />
    </slot>
    <div :style="{
    ...(!windowViewOnly && styles.windowBottomBorder),
    ...styles.contentContainer,
  }">
      <div :style="{
    ...(!windowViewOnly && styles.windowBottomBorder),
    ...styles.body,
    ...(isLoading &&
      isEmptyArray(notificationsContent) &&
      !error && { overflow: 'hidden' }),
  }" :class="containerClassNames">
        <slot name="customLoader" v-if="isLoading && isEmptyArray(notificationsContent) && !error">
          <LoaderComponent :styles="styles" :hideAvatar="true" />
        </slot>

        <slot name="customErrorWindow" v-if="error && error.length > 0 && !isLoading">
          <ErrorWindow :styles="styles" :darkMode="darkMode" :error="error" />
        </slot>

        <slot name="listEmptyComponent" v-if="isEmptyArray(notificationsContent) && !isLoading && !error && reachedEnd">
          <EmptyList :styles="styles" :darkMode="darkMode" />
        </slot>

        <div v-if="!isEmptyArray(notificationsContent) && !isLoading && !error" class="siren-sdk-panel-list-container">
          <div class="siren-sdk-panel-list">
            <div v-for="notification in notificationsContent" :key="notification?.id">
              <slot name="customCard" :item="notification">
                <NotificationCard :notification="notification"
                  :cardProps="cardProps"
                  :onCardClick="onCardClick" :deleteById="deleteNotificationById"
                  :styles="styles" :darkMode="darkMode" />
              </slot>
            </div>
          </div>
          <LoadMore :onLoadMore="onLoadMore" :paginationLoading="paginationLoading"
            v-if="!reachedEnd && !isEmptyArray(notificationsContent) && !isLoading"
            :styles="styles">
            <template #loadMoreComponent>
              <slot name="loadMoreComponent" />
            </template>
          </LoadMore>
        </div>

      </div>

      <div v-if="!isEmptyArray(notificationsContent) && !isLoading" class="siren-sdk-panel-footer">
        <slot name="customFooter" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
Ref } from 'vue';
import {
  computed,
  defineProps,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue';
import type { Siren } from 'test_notification';
import type {
  ActionResponse,
  MarkAsViewedResponse,
  NotificationDataType,
  NotificationsApiResponse
} from 'test_notification/dist/esm/types';
import PubSub from 'pubsub-js';

import {
  filterDataProperty,
  generateFilterParams,
  isEmptyArray,
  isValidResponse,
  mergeArrays,
  updateNotifications
} from '../utils/commonUtils';
import type { SirenPanelProps } from '../types';
import { VerificationStatus, ERROR_TEXT, EventType, errorMap, eventTypes, events, DEFAULT_WINDOW_TITLE } from '../utils/constants';
import HeaderComponent from './HeaderComponent.vue';
import NotificationCard from './NotificationCard.vue';
import EmptyList from './EmptyList.vue';
import LoadMore from './LoadMore.vue';
import LoaderComponent from './LoaderComponent.vue';
import ErrorWindow from './ErrorWindow.vue';

import '../styles/panel.css';
import useSiren from '../composables/useSiren';

const props = defineProps<SirenPanelProps>();

type EventListenerDataType = {
  id?: string;
  action: string;
  newNotifications?: NotificationDataType[];
  unreadCount?: number;
};

const siren: Ref<Siren> = inject('siren') as Ref<Siren>;
const verificationStatus: Ref<VerificationStatus> = inject('verificationStatus') as Ref<VerificationStatus>;

const {
  markAllAsViewed,
  deleteByDate,
  deleteById
} = useSiren();

const notificationsContent = ref<NotificationDataType[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string>('');
const reachedEnd = ref<boolean>(false);
const paginationLoading = ref<boolean>(false);
const eventListenerData = ref<EventListenerDataType | null>(null);

let panelStyle = {};

const containerClassNames = `${(!notificationsContent.value?.length || error) && isLoading.value && 'siren-sdk-content-container'}`;
const triggerOnError = computed(
  () =>
    (
      response: NotificationsApiResponse | ActionResponse | MarkAsViewedResponse
    ) => {
      if (response?.error && props.onError)
        return props.onError(response.error);

      return null;
    }
);

const deleteNotificationById = computed(() => async (id: string) => {
  try {
    const response = await deleteById(id);

    if (response) triggerOnError.value(response);
  } catch (err) {
    // TODO: handle error
  }
});

const notificationSubscriber = async (_type: string, dataString: string) => {
  const data = await JSON.parse(dataString);

  eventListenerData.value = data;
};

const restartNotificationCountFetch = () => {
  try {
    siren.value?.startRealTimeFetch({ eventType: EventType.UNVIEWED_COUNT });
  } catch (er) {
    //  handle error if needed
  }
};

const cleanUp = () => {
  siren.value?.stopRealTimeFetch(EventType.NOTIFICATION);
};

const handleMarkNotificationsAsViewed = async (
  createdAt: string
): Promise<void> => {
  try {
    const payload = {
      unviewedCount: 0,
      action: eventTypes.UPDATE_NOTIFICATIONS_COUNT
    };

    PubSub.publish(events.NOTIFICATION_COUNT_EVENT, JSON.stringify(payload));
    if (createdAt) {
      const response = await markAllAsViewed(createdAt);

      if (response) triggerOnError.value(response);
    }
  } catch (er) {
    //  handle error if needed
  }
};

const updateNotificationList = (
  newNotifications: NotificationDataType[],
  isRefresh: boolean
) => {
  const updatedNotifications = !isRefresh
    ? mergeArrays(notificationsContent.value, newNotifications)
    : newNotifications;

  notificationsContent.value = updatedNotifications;

  if (isRefresh)
    handleMarkNotificationsAsViewed(updatedNotifications[0].createdAt);
};

const resetRealTimeFetch = (
  refresh: boolean,
  newList: NotificationDataType[] | null
) => {
  if (!refresh) return;

  try {
    siren.value?.startRealTimeFetch(
      {
        eventType: EventType.NOTIFICATION,
        params: generateFilterParams(newList ?? [], true, props.itemsPerFetch)
      }
    );
  } catch (er) {
    //  handle error if needed
  }
};

const fetchNotifications = async (isRefresh = false) => {
  error.value = '';
  if (!isRefresh)
    paginationLoading.value = true;

  else
    isLoading.value = true;

  if (!siren.value) return;

  try {
    const response = await siren.value?.fetchAllNotifications(
      generateFilterParams(
        isRefresh ? [] : notificationsContent.value,
        false,
        props.itemsPerFetch
      )
    );

    if (response && isValidResponse(response)) {
      let data: NotificationDataType[] | null = null;

      if (!isEmptyArray(response.data ?? [])) {
        data = filterDataProperty(response);
        if (!data) return;
        if (response?.meta) {
          const isLastPage = response?.meta?.last === 'true';

          if (isLastPage) reachedEnd.value = true;
          else reachedEnd.value = false;
        }
        updateNotificationList(data, isRefresh);
      }
      if (!data) reachedEnd.value = true;
      resetRealTimeFetch(isRefresh, data);
    } else {
      reachedEnd.value = true;
      if (response && 'error' in response)
        error.value = response.error?.Message ?? '';
      else error.value = ERROR_TEXT;
    }
  } catch (error: any) {
    paginationLoading.value = false;
    isLoading.value = false;
    if ('Message' in error) error.value = error?.Message;
    else error.value = ERROR_TEXT;
  }

  if (isRefresh)
    isLoading.value = false;
  else
    paginationLoading.value = false;
};

const onEndReached = (): void => {
  if (
    !isLoading.value &&
    !reachedEnd.value &&
    notificationsContent.value?.length > 0
  )
    fetchNotifications(false);
};

const onLoadMore = () => {
  onEndReached();
};

const resetValues = () => {
  notificationsContent.value = [];
  reachedEnd.value = false;
  error.value = '';
};

const handleClearAllNotification = async (): Promise<void> => {
  try {
    if (!isEmptyArray(notificationsContent.value)) {
      const response = await deleteByDate(
        notificationsContent.value?.[0].createdAt
      );

      if (response) triggerOnError.value(response);

      if (response && isValidResponse(response)) {
        resetValues();
        reachedEnd.value = true;
        isLoading.value = false;
      }
    }
  } catch (err) {
    // TODO: handle error
  }
};

onMounted(() => {
  PubSub.subscribe(events.NOTIFICATION_LIST_EVENT, notificationSubscriber);
});

onBeforeUnmount(() => {
  cleanUp();
  notificationsContent.value = [];
  restartNotificationCountFetch();
  handleMarkNotificationsAsViewed(new Date().toISOString());
});

watch(() => props.modalWidth, () => {
   panelStyle = {
  ...(!props.windowViewOnly && props.styles.windowTopBorder),
  ...(!props.windowViewOnly && { width: `${props.modalWidth}` }),
  ...(!props.windowViewOnly && props.styles.windowBottomBorder),
  ...props.styles.container
};
}, { immediate: true });

watch(
  () => eventListenerData.value,
  () => {
    if (eventListenerData.value) {
      const updatedNotifications: NotificationDataType[] = updateNotifications(
        eventListenerData.value,
        notificationsContent.value
      );

      if (!isEmptyArray(updatedNotifications))
        handleMarkNotificationsAsViewed(updatedNotifications[0]?.createdAt);

      notificationsContent.value = updatedNotifications;
      eventListenerData.value = null;
    }
  },
  { immediate: true }
);

watch(
  [() => siren.value, () => verificationStatus.value],
  () => {
    if (siren.value && verificationStatus.value !== VerificationStatus.PENDING) {
      siren.value?.stopRealTimeFetch(EventType.UNVIEWED_COUNT);
      fetchNotifications(true);
    }
    if (!siren.value && isLoading.value) {
      isLoading.value = false;
      if (props.onError)
        props.onError(errorMap.INVALID_CREDENTIALS);

      error.value = ERROR_TEXT;
    }
  },
  { immediate: true }
);

</script>
