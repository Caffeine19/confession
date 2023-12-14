<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { storeToRefs } from 'pinia'

import CCalculatorInput from '@/components/CCalculatorInput.vue'
import CDateInput from '@/components/CDateInput.vue'
import CButton from '@/components/CButton.vue'
import CDivider from '@/components/CDivider.vue'
import CTabRadio, { type TabOption } from '@/components/CTabRadio.vue'
import CCategoryIcon from '@/components/CCategoryIcon.vue'

import { type EntryType } from '@/types/entry'
import type { Category } from '@/types/category'

import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
const { categoryList } = storeToRefs(categoryStore)
onMounted(() => {
  categoryStore.getCategoryList()
})

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
  <div class="p-6 flex flex-col grow space-y-6">
    <div class="flex space-x-3">
      <CDateInput></CDateInput>
      <CCalculatorInput class="grow"></CCalculatorInput>
      <CButton icon="ph-paper-plane" :show-label="false"></CButton>
    </div>

    <CDivider></CDivider>

    <div class="flex">
      <div class="flex flex-col space-y-6 items-center grow">
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
</template>
