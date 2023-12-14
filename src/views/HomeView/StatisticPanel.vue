<script setup lang="ts">
import { ref } from 'vue'

import CDivider from '@/components/CDivider.vue'

const statisticOptions = ref([
  { label: 'Expense', value: 4710.27 },
  { label: 'Income', value: 1232.39 },
  { label: 'Saving', value: 281.27 }
])
</script>
<template>
  <div class="flex items-stretch rounded-lg px-6 py-3 space-x-4 dark:bg-cookie-200">
    <template v-for="(statistic, index) in statisticOptions" :key="index">
      <div>
        <p class="dark:text-neutral-600 text-lg font-medium">{{ statistic.label }}</p>
        <p class="dark:text-neutral-950 text-2xl font-bold">{{ statistic.value }}</p>
      </div>
      <CDivider
        direction="vertical"
        type="secondary"
        v-if="index !== statisticOptions.length - 1"
      ></CDivider>
    </template>
  </div>
</template>
