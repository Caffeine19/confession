<script setup lang="ts">
import { ref, computed, toRefs, nextTick, reactive, watch } from 'vue'

export interface TabOption<T> {
  label: string
  value: T
}

const props = defineProps<{ tabOptions: TabOption<any>[]; value: TabOption<any>['value'] }>()
const { tabOptions, value } = toRefs(props)

defineEmits(['update:value'])

const tabRef = ref<null | HTMLElement[]>(null)

const activatedTabIndex = computed(() => {
  return tabOptions.value.findIndex((tab) => tab.value === value.value)
})

const activatedTabPosition = reactive({
  left: 0,
  width: 0
})
watch(
  value,
  () => {
    nextTick(() => {
      if (tabRef.value) {
        const tab = tabRef.value[activatedTabIndex.value]

        activatedTabPosition.left = tab.offsetLeft
        activatedTabPosition.width = tab.offsetWidth
      }
    })
  },
  { immediate: true }
)

// const activatedTabPosition = computed(() => {
//     nextTick(()=>{
//         console.log(tabRef.value)
//     })
//   if (tabRef.value) {
//     const tab = tabRef.value[activatedTabIndex.value]
//     return {
//       left: tab.offsetLeft,
//       width: tab.offsetWidth
//     }
//   } else {
//     return {
//       left: 0,
//       width: 0
//     }
//   }
// })
</script>
<template>
  <div class="flex relative items-center px-6 py-2 rounded-lg dark:bg-neutral-900">
    <button
      ref="tabRef"
      v-for="(tab, index) in tabOptions"
      :key="index"
      @click="$emit('update:value', tab.value)"
      class="transition-colors first:ml-0 ml-6"
      :class="
        value === tab.value
          ? 'dark:text-cookie-200 dark:hover:text-cookie-100 text-base font-medium'
          : 'dark:text-neutral-400 dark:hover:text-neutral-300 text-sm font-normal'
      "
    >
      {{ tab.label }}
    </button>

    <div
      class="absolute border-b border-cookie-200 bottom-1.5 transition-all"
      :style="{ left: activatedTabPosition.left + 'px', width: activatedTabPosition.width + 'px' }"
    ></div>
  </div>
</template>
