<script setup lang="ts">
import { ref } from 'vue'

import CTabRadio, { type TabOption } from './CTabRadio.vue'
import CButton from './CButton.vue'
import CDivider from './CDivider.vue'

defineProps<{ title: string; icon: string; chartHeight: string }>()

const tabOptions: TabOption<number>[] = [
  { label: '1W', value: 7 },
  { label: '2W', value: 14 },
  { label: '1M', value: 30 },
  { label: '3M', value: 90 },
  { label: '6M', value: 180 },
  { label: '1Y', value: 365 }
]
const value = ref<TabOption<number>['value']>(7)

const showChart = ref(true)
const toggleShowChart = () => {
  showChart.value = !showChart.value
}

const isFullScreen = ref(false)
const chartRef = ref<null | HTMLElement>(null)
const toggleFullScreen = () => {
  if (!chartRef.value) return
  if (!isFullScreen.value) {
    chartRef.value.requestFullscreen()
    isFullScreen.value = true
  } else {
    document.exitFullscreen()
    isFullScreen.value = false
  }
}
</script>
<template>
  <div
    class="flex flex-col items-stretch p-3 rounded-xl border dark:border-neutral-800 space-y-4"
    ref="chartRef"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center dark:text-neutral-100 space-x-3">
        <i class="ph" style="font-size: 28px" :class="icon"></i>
        <p class="text-lg font-medium">{{ title }}</p>
      </div>

      <div class="flex items-stretch space-x-2">
        <CTabRadio :tab-options="tabOptions" v-model:value="value"></CTabRadio>

        <CDivider direction="vertical" type="primary"></CDivider>

        <div class="flex dark:bg-neutral-900 rounded-lg px-2">
          <CButton
            :icon="isFullScreen ? 'ph-arrows-in-simple' : 'ph-arrows-out-simple'"
            type="secondary"
            @click="toggleFullScreen"
          ></CButton>
          <CButton
            :icon="showChart ? 'ph-eye' : 'ph-eye-closed'"
            type="secondary"
            @click="toggleShowChart"
          ></CButton>
        </div>
      </div>
    </div>

    <div :class="chartHeight" v-if="showChart">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.c-button {
  @apply bg-transparent;
}

.c-button:hover {
  @apply bg-transparent;
}
</style>
