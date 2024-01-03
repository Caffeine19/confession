<script setup lang="ts">
export interface RouteTabProps {
  icon: string
  label: string
  action: () => void
}

defineProps<RouteTabProps>()
</script>
<template>
  <button
    class="flex rounded-full items-center space-x-3 px-4 py-2 group transition-colors dark:hover:bg-neutral-900 bg-transparent w-full"
    @click="action"
  >
    <i
      class="ph dark:group-hover:text-neutral-300 dark:text-neutral-400 transition-colors"
      :class="icon"
      style="font-size: 28px"
    ></i>
    <p
      class="dark:text-neutral-400 text-lg font-normal dark:group-hover:text-neutral-300 transition-colors"
    >
      {{ label }}
    </p>
  </button>
</template>
