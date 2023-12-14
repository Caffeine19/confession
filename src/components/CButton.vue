<script setup lang="ts">
withDefaults(defineProps<{ icon?: string; showLabel?: boolean; label?: string }>(), {
  showLabel: true
})
</script>
<template>
  <button
    class="c-button rounded-lg p-2 dark:bg-cookie-200 dark:hover:bg-cookie-100 flex items-center justify-center transition-colors group"
  >
    <i
      class="c-button-icon ph dark:text-neutral-950 dark:group-hover:text-neutral-800 transition-colors"
      :class="icon"
      style="font-size: 24px"
    >
    </i>
    <p class="c-button-label" v-if="showLabel">{{ label }}</p>
  </button>
</template>
