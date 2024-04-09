<template>
    <div :class="className" :style="{ width: size, height: size }">
        <svg :width="size" :height="size" viewBox="0 0 20 20" :fill="fill" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 15L15 5M5 5L15 15" :stroke="stroke" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>

    </div>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
        fill?: string;
        className?: string;
        size?: string;
        stroke?: string;
    }>(),
    {
        fill: 'none',
        size: '20',
        stroke: '#98A2B3'
    }
)
</script>