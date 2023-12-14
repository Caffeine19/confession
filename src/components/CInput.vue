<script setup lang="ts">
import CDivider from '@/components/CDivider.vue'

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

defineEmits(['change', 'input'])
</script>
<template>
  <div
    class="flex items-stretch dark:bg-neutral-900 rounded-lg p-2 space-x-3 group dark:hover:border-neutral-600 border border-transparent dark:hover:bg-neutral-800 transition-colors"
  >
    <i class="dark:text-neutral-600 ph" style="font-size: 24px" :class="icon"></i>
    <CDivider
      direction="vertical"
      type="secondary"
      class="group-hover:dark:border-neutral-700"
    ></CDivider>
    <input
      class="bg-transparent outline-none dark:placeholder-neutral-600 text-base font-normal w-full dark:text-neutral-200"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', ($event.target as HTMLInputElement).value)"
      @change="$emit('change', ($event.target as HTMLInputElement).value)"
    />
    <slot></slot>
  </div>
</template>
