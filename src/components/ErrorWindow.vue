<template>
  <div class="siren-sdk-error-window-container">
    <div :style="containerStyle" class="siren-sdk-error-icon-container">
      <img
        src="../assets/errorIcon.svg"
        alt="error_icon"
        :style="iconOpacity"
        class="siren-sdk-error-icon"
      />
    </div>
    <div :style="styles.errorText" class="siren-sdk-error-text">
      {{ error || ERROR_TEXT }}
    </div>
    <div :style="styles.errorText" class="siren-sdk-error-sub-text">
      {{ ERROR_SUB_TEXT }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import { COLORS, ERROR_TEXT, ERROR_SUB_TEXT } from '../utils/constants';
import type { ErrorWindowProps } from '../types';

import '../styles/errorWindow.css';

const props = defineProps<ErrorWindowProps>();

const containerStyle = {
  backgroundColor: props.darkMode
    ? COLORS.dark.iconColor
    : COLORS.light.iconColor
};
const iconOpacity = { opacity: props.darkMode ? 0.2 : 1 };
</script>
