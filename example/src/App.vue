<template>
  <div :style="{ height: '100vh'}">
    <SirenProvider
    :config="{ userToken: 'your_user_token', recipientId: 'your_recipient_id' }">
    <HomePage />
  </SirenProvider>
  </div>
</template>

<script setup lang="ts">
import { SirenProvider } from '@sirenapp/vue-inbox';
import HomePage from './components/HomePage.vue';

</script>
