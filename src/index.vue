<template>
    <button type="button">{{ label }}</button>
  </template>
  <script setup lang="ts">
  defineProps<{
  label: string;
  }>();
  </script>
