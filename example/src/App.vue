<template>
  <SirenProvider
    :config="{ userToken: 'sample-token', recipientId: 'sample-recipientId' }">
    <HomePage />
  </SirenProvider>
</template>

<script setup lang="ts">
import { SirenProvider } from '@sirenapp/vue-inbox';
import HomePage from './components/HomePage.vue';

</script>
