<template>
  <SirenInbox :theme="{
    dark: {
      colors: {
        primaryColor: 'blue',
      },
    },
    light: {
      colors: {
        primaryColor: '#800000',
        activeCardColor: '#FFDADA',
        primarydivColor: '#FFFFFF',
        secondaryColor: '#3D89DF',
        divColor: '#000000',
        neutralColor: '#FFFFFF',
        borderColor: '#560000',
      },
    },
  }" :customStyle="{
    notificationIcon: {
      size: 40
    }
  }" loadMoreLabel="Show more" :headerProps="{
    title: 'Siren Notifications',
    hideHeader: false,
    hideClearAll: true
  }" 
  :cardProps="{
  hideDelete: false,
  onAvatarClick: (notification: any) => console.log(notification)}"
  :onCardClick ="(notification: any) => console.log(notification) "
  :onError="(error: any) => console.log(error)"/>
</template>

<script setup lang="ts">
import { SirenInbox } from '@siren/vue-inbox';
</script>