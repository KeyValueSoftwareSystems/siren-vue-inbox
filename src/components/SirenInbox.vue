<template>
  <div
  :class="!windowViewOnly && 'siren-sdk-inbox-container'"
  ref="notificationRef"
  >
      <div v-if="!windowViewOnly" ref="iconRef">
        <NotificationIcon
          :handleNotification="handleNotification"
          :badgeType="showNotifications ? BadgeType.NONE : BadgeType.DEFAULT"
          :darkMode="darkMode"
          :styles="styles"
          />
      </div>
      <div
        v-if="showNotifications || windowViewOnly"
        :style="{
    ...styles.container,
    ...(!windowViewOnly && styles.windowShadow),
    width:
          windowViewOnly || windowWidth < 500
            ? '100%'
            : styles?.container?.width,
        position: windowViewOnly || windowWidth < 500 ? 'initial' : 'absolute',
        ...modalPosition,
  }"
  >
        <SirenPanel
          :hideHeader="hideHeader"
          :title="title"
          :onNotificationCardClick="onNotificationCardClick"
          :darkMode="darkMode"
          :styles="styles"
          :windowViewOnly="windowViewOnly"
          :showNotifications="showNotifications"
          :noOfNotificationsPerFetch="noOfNotificationsPerFetch"
          :hideClearAll="hideClearAll"
          :cardProps="cardProps ?? { hideAvatar: false, showMedia: false }"
          >
          <template #loadMoreComponent>
            <slot name="loadMoreComponent" />
          </template>
          <template #customHeader>
            <slot name="customHeader" />
          </template>
          <template #customLoader>
            <slot name="customLoader" />
          </template>
          <template #customErrorWindow>
            <slot name="customErrorWindow" />
          </template>
          <template #emptyList>
            <slot name="listEmptyComponent" />
          </template>
          <template>
            <slot name="customNotificationCard" />
          </template>
          <template #footer>
            <slot name="customFooter" />
          </template>
        </SirenPanel>
      </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  defineProps,
  withDefaults,
  computed,
  onMounted,
  onBeforeUnmount,
  inject
} from 'vue';
import type { Siren } from 'test_notification';

import type { SirenProps } from '../types';
import { applyTheme, calculateModalPosition } from '../utils/commonUtils';
import {
  ThemeMode,
  BadgeType,
  DEFAULT_WINDOW_TITLE,
  DEFAULT_NOTIFICATION_FETCH_COUNT
} from '../utils/constants';
import SirenPanel from './SirenPanel.vue';
import NotificationIcon from './NotificationIcon.vue';

import '../styles/inbox.css';

const props = withDefaults(defineProps<SirenProps>(), {
  title: DEFAULT_WINDOW_TITLE,
  windowViewOnly: false,
  hideHeader: false,
  hideClearAll: false,
  noOfNotificationsPerFetch: DEFAULT_NOTIFICATION_FETCH_COUNT,
  darkMode: false
});

const notificationRef = ref<HTMLElement | null>(null);
const iconRef = ref<HTMLElement | null>(null);
const showNotifications = ref<boolean>(false);
const modalPosition = ref<{
  top: string;
  left?: string;
}>({
  top: '0px'
});

const siren: Siren | undefined = inject('siren');

const styles = computed(() =>
  applyTheme(
    props?.darkMode ? props?.theme?.dark : props?.theme?.light,
    props.darkMode ? ThemeMode.DARK : ThemeMode.LIGHT,
    props.customStyle
  )
);

const windowWidth = computed(() => window.innerWidth);

const handleNotification = (event: any) => {
  event.preventDefault();
  showNotifications.value = !showNotifications.value;
};

const closeNotification = () => {
  showNotifications.value = false;
};

const handleOutsideClick = (event: MouseEvent) => {
  if (
    notificationRef.value &&
    !notificationRef.value.contains(event.target as Node)
  )
    closeNotification();
};

const updateModalPosition = () => {
  const containerWidth = styles.value?.container?.width || 400;

  modalPosition.value = calculateModalPosition(iconRef, window, containerWidth);
};

onMounted(() => {
  updateModalPosition();

  window.addEventListener('resize', updateModalPosition);
});

watch(showNotifications, () => {
  if (showNotifications.value)
    document.addEventListener('click', handleOutsideClick);
  else document.removeEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
  window?.removeEventListener('resize', updateModalPosition);
  siren?.stopRealTimeNotificationFetch();
  siren?.stopRealTimeUnviewedCountFetch();
});
</script>
