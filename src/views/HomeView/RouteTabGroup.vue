<script setup lang="ts">
import { reactive } from 'vue'

interface RouteTab {
  icon: string
  label: string
}
const routeTabOptions = reactive<RouteTab[]>([
  {
    icon: 'ph-bank',
    label: 'Home'
  },
  {
    icon: 'ph-cardholder',
    label: 'Property'
  },

  {
    icon: 'ph-map-trifold',
    label: 'Budget'
  },

  {
    icon: 'ph-swatches',
    label: 'Category'
  }
])
</script>
<template>
  <div class="p-6 border-r dark:border-neutral-800 space-y-6">
    <button
      v-for="(tab, index) in routeTabOptions"
      :key="index"
      class="flex rounded-full items-center space-x-3 px-4 py-2 group transition-colors dark:hover:bg-neutral-900 bg-transparent w-full"
    >
      <i
        class="ph dark:group-hover:text-neutral-300 dark:text-neutral-400 transition-colors"
        :class="tab.icon"
        style="font-size: 28px"
      ></i>
      <p
        class="dark:text-neutral-400 text-lg font-normal dark:group-hover:text-neutral-300 transition-colors"
      >
        {{ tab.label }}
      </p>
    </button>
  </div>
</template>
