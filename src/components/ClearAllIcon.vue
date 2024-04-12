<template>
    <div :class="className" :style="{ width: size, height: size }">
        <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5 12C5 12.5523 5.44772 13 6 13H18C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11H6C5.44772 11 5 11.4477 5 12ZM3 16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15H4C3.44772 15 3 15.4477 3 16ZM8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9H20C20.5523 9 21 8.55228 21 8C21 7.44772 20.5523 7 20 7H8Z"
                :fill="fill" />
        </svg>
    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        fill?: string;
        className?: string;
        size?: string;
    }>(),
    {
        className: '',
        fill: '#667185',
        size: '24'
    }
);
</script>
