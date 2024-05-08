<template>
  <div class="siren-sdk-loader-container" data-testid="loader-container">
    <div
      v-for="number in 5"
      :key="number"
      class="siren-sdk-card-loader-container"
    >
      <div v-if="!hideAvatar" :style="styles.loader" class="siren-sdk-card-loader-avatar" />
      <div class="siren-sdk-card-loader-details" :class="hideAvatar ? 'siren-sdk-card-hide-avatar' : 'siren-sdk-card-show-avatar'">
        <div :style="styles.loader" class="siren-sdk-card-loader-header" />
        <div :style="styles.loader" class="siren-sdk-card-loader-header" />
        <div :style="styles.loader" class="siren-sdk-card-loader-body" />
        <div class="siren-sdk-card-loader-time-container">
          <div :style="styles.loader" class="siren-sdk-card-loader-time-icon" />
          <div :style="styles.loader" class="siren-sdk-card-loader-time" />
        </div>
      </div>
      <div :style="styles.loader" class="siren-sdk-card-loader-delete-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SirenStyleProps } from '../types';

import '../styles/loader.css';

defineProps<{
  styles: SirenStyleProps;
  hideAvatar: boolean;
}>();
</script>
