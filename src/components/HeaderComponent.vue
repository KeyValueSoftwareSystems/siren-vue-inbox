<template>
  <div
    :style="{
      ...(!windowViewOnly && styles.windowTopBorder),
      ...styles.headerContainer,
    }"
    class="siren-sdk-header-container"
    data-testid="header-container"
  >
    <p :style="styles.headerTitle" class="siren-sdk-text-break">{{ title }}</p>
    <div
      v-if="!hideClearAll"
      data-testid="clear-all"
      @click="handleClearAllNotification"
      @keydown="handleClearAllNotification"
      :style="{
        opacity: !enableClearAll ? 0.4 : 1,
        cursor: enableClearAll ? 'pointer' : 'not-allowed',
      }"
      class="siren-sdk-header-right-container"
    >
      <ClearIcon
        :fill="styles.clearIcon?.color"
        :size="String(styles.clearIcon?.size)"
      />
      <p class="siren-sdk-header-clear-all-text" :style="styles.headerAction">
        {{ CLEAR_ALL_LABEL }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';

import type { HeaderProps } from '../types';
import { CLEAR_ALL_LABEL } from '../utils/constants';
import ClearIcon from './ClearAllIcon.vue';

import '../styles/header.css';

withDefaults(defineProps<HeaderProps>(), {
  enableClearAll: true
});
</script>
