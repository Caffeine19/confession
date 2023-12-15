<script setup lang="ts">
defineProps<{ title: string; icon: string }>()
</script>
<template>
  <div class="flex flex-col items-stretch p-3 rounded-xl border dark:border-neutral-800 space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center dark:text-neutral-100 space-x-3">
        <i class="ph" style="font-size: 28px" :class="icon"></i>
        <p class="text-lg font-medium">{{ title }}</p>
      </div>
    </div>

    <div class="h-[16rem]">
      <slot></slot>
    </div>
  </div>
</template>
