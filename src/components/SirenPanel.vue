<template>
  <div :class="windowViewOnly ? 'siren-sdk-panel-container' : 'siren-sdk-panel-modal'"
    :style="{ ...(!windowViewOnly && styles.windowTopBorder), ...(!windowViewOnly && styles.windowBottomBorder), ...styles.container }">
    <slot name="customHeader" v-if="!hideHeader">
      <HeaderComponent :title="title" :enableClearAll="!isEmptyArray(notificationsContent) && !isLoading"
        :handleClearAllNotification="handleClearAllNotification" :styles="styles" :windowViewOnly="windowViewOnly"
        :hideClearAll="hideClearAll" />
    </slot>
    <div :style="{ ...(!windowViewOnly && styles.windowBottomBorder), ...styles.contentContainer }">
      <div
        :style="{ ...(!windowViewOnly && styles.windowBottomBorder), ...styles.body, ...(isLoading && isEmptyArray(notificationsContent) && !error && { overflow: 'hidden' }) }"
        :class="containerClassNames">
        <slot name="customLoader" v-if="isLoading && isEmptyArray(notificationsContent) && !error">
          <LoaderComponent :styles="styles" />
        </slot>

        <slot name="customErrorWindow" v-if="error && error.length > 0">
          <ErrorWindow :styles="styles" :darkMode="darkMode" :error="error" />
        </slot>

        <slot name="listEmptyComponent" v-if="isEmptyArray(notificationsContent) && !isLoading && !error">
          <EmptyList :styles="styles" :darkMode="darkMode" />
        </slot>

        <div v-for="notification in notificationsContent" :key="notification?.id"
          v-if="!isEmptyArray(notificationsContent) && !isLoading && !error">
          <slot name="customNotificationCard">
            <NotificationCard :notification="notification" :cardProps="{ hideAvatar: false, showMedia: true }"
              :onNotificationCardClick="onNotificationCardClick" :deleteNotificationById="deleteNotificationById"
              :styles="styles" :darkMode="darkMode" />
          </slot>
        </div>

        <LoadMore :onLoadMore="onLoadMore" :paginationLoading="paginationLoading"
          v-if="!reachedEnd && !isEmptyArray(notificationsContent)" :styles="styles">
          <template #loadMoreComponent>
            <slot name="loadMoreComponent" />
          </template>
        </LoadMore>

      </div>

      <div v-if="!isEmptyArray(notificationsContent) && !isLoading" class="siren-sdk-panel-footer">
        <slot name="customFooter" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

import { isEmptyArray } from '../utils/commonUtils';
import { SirenPanelProps } from '../types';
import HeaderComponent from './HeaderComponent.vue';
import NotificationCard from './NotificationCard.vue';
import EmptyList from './EmptyList.vue';
import LoadMore from './LoadMore.vue';
import LoaderComponent from './LoaderComponent.vue';
import ErrorWindow from './ErrorWindow.vue';

import '../styles/panel.css';

defineProps<SirenPanelProps>()

const notificationsContent = ref<any[]>([]);
const isLoading = ref<boolean>(false);
const error = ref<string>('');
const reachedEnd = ref<boolean>(false);
const paginationLoading = ref<boolean>(false);

const containerClassNames = `${(!notificationsContent.value?.length || error) && isLoading.value && "siren-sdk-content-container"}`

const deleteNotificationById = () => { }

const onLoadMore = () => { }

const handleClearAllNotification = () => { }


</script>