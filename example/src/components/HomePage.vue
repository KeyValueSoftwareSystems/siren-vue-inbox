<template>
  <SirenInbox :theme="{
    dark: {
      colors: {
        primaryColor: 'blue',
      },
    },
    light: {
      colors: {
        primaryColor: '#F00000',
        textColor: '#000000',
        neutralColor: '#FFFFFF',
        borderColor: '#3D89DF',
        highlightedCardColor: '#34F475',
        dateColor: '#FFFFFF',
        deleteIcon: '#560000',
        timerIcon: '#3D89DF',
        clearAllIcon: '#FFDADA',
        infiniteLoader: '#800000',
        windowShadowColor: '#3D89DF'
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
  }" :cardProps="{
    hideDelete: false,
    onAvatarClick: (notification: any) => console.log(notification)
  }" :onCardClick="(notification: any) => console.log(notification)" :onError="(error: any) => console.log(error)" />
</template>

<script setup lang="ts">
import { SirenInbox } from '@sirenapp/vue-inbox';
</script>