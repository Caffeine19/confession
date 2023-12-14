<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { storeToRefs } from 'pinia'

import CLogo from '@/components/CLogo.vue'
import CInput from '@/components/CInput.vue'
import CCalculatorInput from '@/components/CCalculatorInput.vue'
import CDateInput from '@/components/CDateInput.vue'
import CButton from '@/components/CButton.vue'
import CDivider from '@/components/CDivider.vue'
import CTabRadio, { type TabOption } from '@/components/CTabRadio.vue'
import CCategoryIcon from '@/components/CCategoryIcon.vue'

import RouteTabGroup from './RouteTabGroup.vue'

import { type EntryType } from '@/types/entry'

import { useCategoryStore } from '@/stores/category'
import type { Category } from '@/types/category'

const categoryStore = useCategoryStore()
const { categoryList } = storeToRefs(categoryStore)
onMounted(() => {
  categoryStore.getCategoryList()
})

const searchKeyword = ref('')

const entryTabValue = ref<EntryType>('output')
const entryTabOptions: TabOption<EntryType>[] = [
  { label: 'Output', value: 'output' },
  { label: 'Input', value: 'input' },
  { label: 'Transfer', value: 'transfer' }
]

const categoryListFilteredByEntryType = computed(() => {
  return categoryList.value.filter((category) => category.type === entryTabValue.value)
})

const selectedCategory = ref()
const setSelectedCategory = (category: Category) => {
  selectedCategory.value = category
}
</script>

<template>
  <div class="dark:bg-neutral-950 w-screen h-screen overflow-hidden flex flex-col">
    <div class="border-b dark:border-neutral-800 grid grid-cols-3 px-6 py-3">
      <CLogo></CLogo>
      <CInput placeholder="Quick Search" v-model:value="searchKeyword" :show-hot-key="true">
        <div class="flex items-center">
          <p class="text-sm font-semibold dark:text-neutral-600">Ctrl+Shift+F</p>
        </div>
      </CInput>

      <button
        class="flex items-center justify-center dark:bg-neutral-900 p-2 rounded-lg w-fit justify-self-end"
      >
        <i class="ph ph-gear-fine dark:text-neutral-400" style="font-size: 24px"></i>
      </button>
    </div>

    <div class="flex grow">
      <RouteTabGroup></RouteTabGroup>

      <div></div>

      <div class="p-6 flex flex-col grow space-y-6">
        <div class="flex space-x-3">
          <CDateInput></CDateInput>
          <CCalculatorInput class="grow"></CCalculatorInput>
          <CButton icon="ph-paper-plane" :show-label="false"></CButton>
        </div>

        <CDivider></CDivider>

        <div class="flex">
          <div class="flex flex-col space-y-6 items-center w-96">
            <CTabRadio v-model:value="entryTabValue" :tab-options="entryTabOptions"></CTabRadio>

            <div class="flex gap-3 flex-wrap justify-center" v-if="entryTabValue !== 'transfer'">
              <CCategoryIcon
                v-for="category in categoryListFilteredByEntryType"
                :key="category.value"
                v-bind="category"
                @click="setSelectedCategory(category)"
                :activated="selectedCategory === category"
              ></CCategoryIcon>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
