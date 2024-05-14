<template>
  <div class="siren-sdk-load-more-container" data-testid="load-more-container" aria-label="siren-load-more">
    <div
      :class="
        paginationLoading
          ? 'siren-sdk-pagination-loader'
          : 'siren-sdk-load-more-text'
      "
      :style="paginationLoading ? styles.infiniteLoader : styles.loadMoreButton"
      @click="onLoadMore"
      @keydown="onLoadMore"
      data-testid="on-load-more"
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
