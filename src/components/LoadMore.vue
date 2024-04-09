<template>
  <div class="siren-sdk-load-more-container">
    <div
      :class="
        paginationLoading
          ? 'siren-sdk-pagination-loader'
          : 'siren-sdk-load-more-text'
      "
      :style="paginationLoading ? styles.infiniteLoader : styles.loadMoreButton"
      @click="onLoadMore"
      @keydown="onLoadMore"
    >
      <slot name="loadMoreComponent">{{
        !paginationLoading ? "Load more" : ""
      }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import type { LoadMoreProps } from '../types';

import '../styles/loadMore.css';

defineProps<LoadMoreProps>();
</script>
