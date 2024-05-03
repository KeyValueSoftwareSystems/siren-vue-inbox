<template>
  <div class="siren-sdk-empty-container" data-testid="empty-container">
    <div :style="containerStyle" class="siren-sdk-empty-icon-container">
      <img
        :src="darkMode ? darkIcon : lightIcon"
        alt="empty_list"
        class="siren-sdk-empty-icon"
      />
    </div>
    <div :style="styles.emptyText" class="siren-sdk-empty-text">
      {{ LIST_EMPTY_TEXT }}
    </div>
    <div :style="styles.emptyText" class="siren-sdk-empty-sub-text">
      {{ LIST_EMPTY_SUB_TEXT }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  COLORS,
  LIST_EMPTY_TEXT,
  LIST_EMPTY_SUB_TEXT
} from '../utils/constants';
import type { EmptyListProps } from '../types';
import darkIcon from '../assets/dark/emptyIconDark.svg';
import lightIcon from '../assets/light/emptyIconLight.svg';

import '../styles/emptyList.css';

const props = defineProps<EmptyListProps>();

const containerStyle = {
  backgroundColor: props.darkMode
    ? COLORS.dark.iconColor
    : COLORS.light.iconColor
};
</script>
