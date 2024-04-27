<template>
  <SirenProvider :config="{ userToken: '227047349b3044fbac7c24fdf5537c44', recipientId: '551cd601-65b3-41b2-bbce-bbd15908992f' }">
    <HomePage />
  </SirenProvider>
</template>

<script setup lang="ts">
import {SirenProvider} from  '@siren/vue-inbox';
import HomePage from './components/HomePage.vue';

</script>
