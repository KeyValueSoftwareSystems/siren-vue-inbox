<template>
    <div :class="!windowViewOnly && 'siren-sdk-inbox-container'" ref="notificationRef" data-testid="siren-inbox-container">
      <div v-if="!windowViewOnly" ref="iconRef" data-testid="siren-inbox-icon">
        <NotificationIcon :handleNotification="handleNotification"
          :badgeType="showNotifications ? BadgeType.NONE : BadgeType.DEFAULT"
          :darkMode="darkMode" :styles="styles" />
      </div>
      <div v-if="showNotifications || windowViewOnly" :style="{
    ...styles.container,
    ...(!windowViewOnly && styles.windowShadow),
    width:
      windowViewOnly
        ? '100%'
        : updatedModalWidth,
    position: windowViewOnly ? 'initial' : 'absolute',
    ...modalPosition,
  }">
        <SirenPanel :styles="styles"
          :itemsPerFetch="itemsPerFetch"
          :hideBadge="hideBadge"
          :headerProps="headerProps ?? defaultHeaderProps"
          :onCardClick="onCardClick"
          :onError="onError"
          :darkMode="darkMode"
          :windowViewOnly="windowViewOnly"
          :showNotifications="showNotifications"
          :hideClearAll="headerProps?.hideClearAll ?? false"
          :loadMoreLabel="loadMoreLabel"
          :cardProps="cardProps ?? defaultCardProps"
          :modalWidth="updatedModalWidth">
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
          <template #customCard="{ item }">
            <slot name="customCard" :item="item" />
          </template>
          <template #footer>
            <slot name="customFooter" />
          </template>
        </SirenPanel>
      </div>
    </div>
</template>

<script setup lang="ts">
import type {
Ref
} from 'vue';
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
import { applyTheme, calculateModalPosition, calculateModalWidth, debounce } from '../utils/commonUtils';
import {
  ThemeMode,
  BadgeType,
  DEFAULT_WINDOW_TITLE,
  DEFAULT_NOTIFICATION_FETCH_COUNT,
EventType
} from '../utils/constants';
import SirenPanel from './SirenPanel.vue';
import NotificationIcon from './NotificationIcon.vue';

import '../styles/inbox.css';
import defaultStyles from '../utils/defaultStyles';

const props = withDefaults(defineProps<SirenProps>(), {
  windowViewOnly: false,
  itemsPerFetch: DEFAULT_NOTIFICATION_FETCH_COUNT,
  darkMode: false,
  hideBadge: false,
  loadMoreLabel: 'Load more'
});

const defaultHeaderProps = {
  title: DEFAULT_WINDOW_TITLE,
  hideHeader: false,
  hideClearAll: false
};

const defaultCardProps = { hideAvatar: false, showMedia: false };

const notificationRef = ref<HTMLElement | null>(null);
const iconRef = ref<HTMLElement | null>(null);
const showNotifications = ref<boolean>(false);
const modalPosition = ref<{
  right?: string;
  left?: string;
}>();

const initialModalWidth =
  props.customStyle?.window?.width || defaultStyles.window.width;

const updatedModalWidth = ref(initialModalWidth);

const siren: Ref<Siren> = inject('siren') as Ref<Siren>;

const styles = computed(() =>
  applyTheme(
    props?.darkMode ? props?.theme?.dark : props?.theme?.light,
    props.darkMode ? ThemeMode.DARK : ThemeMode.LIGHT,
    props.customStyle
  )
);

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

const calculateUpdatedModalWidth = () => {
  const modalWidth = calculateModalWidth(initialModalWidth);

  if (window.innerWidth <= modalWidth)
    updatedModalWidth.value = `${window.innerWidth - 40}px`;
  else
    updatedModalWidth.value = initialModalWidth;
};

const containerWidth = styles.value.container.width || defaultStyles.window.width;

const updateWindowViewMode = () => {
  modalPosition.value = calculateModalPosition(iconRef, window, containerWidth);
};

const debouncedUpdate = debounce(updateWindowViewMode, 200);

onMounted(() => {
  calculateUpdatedModalWidth();
  window.addEventListener('resize', calculateUpdatedModalWidth);
});

onMounted(() => {
  updateWindowViewMode();
  window.addEventListener('resize', debouncedUpdate);
});

watch(showNotifications, () => {
  if (showNotifications.value)
    document.addEventListener('click', handleOutsideClick);
  else document.removeEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
  window?.removeEventListener('resize', calculateUpdatedModalWidth);
  window.removeEventListener('resize', debouncedUpdate);
  siren.value?.stopRealTimeFetch(EventType.NOTIFICATION);
  siren.value?.stopRealTimeFetch(EventType.UNVIEWED_COUNT);
});
</script>
