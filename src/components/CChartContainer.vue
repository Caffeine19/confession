<script setup lang="ts">
import { ref } from 'vue'

import CTabRadio, { type TabOption } from './CTabRadio.vue'

defineProps<{ title: string; icon: string }>()

const tabOptions: TabOption<number>[] = [
  { label: '1W', value: 7 },
  { label: '2W', value: 14 },
  { label: '1M', value: 30 },
  { label: '3M', value: 90 },
  { label: '6M', value: 180 },
  { label: '1Y', value: 365 }
]
const value = ref<TabOption<number>>(7)
</script>
<template>
  <div class="flex flex-col items-stretch p-3 rounded-xl border dark:border-neutral-800 space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center dark:text-neutral-100 space-x-3">
        <i class="ph" style="font-size: 28px" :class="icon"></i>
        <p class="text-lg font-medium">{{ title }}</p>
      </div>

      <CTabRadio :tab-options="tabOptions" v-model:value="value"></CTabRadio>
    </div>

    <div class="h-[16rem]">
      <slot></slot>
    </div>
  </div>
</template>
