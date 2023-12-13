<script setup lang="ts">
withDefaults(
  defineProps<{
    placeholder?: string
    icon?: string
    value: string
  }>(),
  {
    icon: 'ph-magnifying-glass'
  }
)

defineEmits(['update:value'])
</script>
<template>
  <div
    class="flex items-stretch dark:bg-neutral-900 rounded-lg p-2 space-x-3 group dark:hover:border-neutral-600 border border-transparent dark:hover:bg-neutral-800 transition-colors"
  >
    <i class="dark:text-neutral-600 ph" style="font-size: 24px" :class="icon"></i>
    <div class="border-l dark:border-neutral-600"></div>
    <input
      class="bg-transparent outline-none dark:placeholder-neutral-600 text-base font-normal w-full dark:text-neutral-200"
      :placeholder="placeholder"
      @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
    />
    <slot></slot>
  </div>
</template>
