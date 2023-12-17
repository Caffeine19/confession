<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

import CCalculatorInput from '@/components/CCalculatorInput.vue'
import CDateInput from '@/components/CDateInput.vue'
import CButton from '@/components/CButton.vue'
import CDivider from '@/components/CDivider.vue'
import CTabRadio, { type TabOption } from '@/components/CTabRadio.vue'
import CCategoryIcon from '@/components/CCategoryIcon.vue'
import CPropertyList from '@/components/CPropertyList.vue'

import { type EntryType } from '@/types/entry'
import type { Category } from '@/types/category'

import { useCategoryStore } from '@/stores/category'
import { useEntryStore } from '@/stores/entry'

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

const selectedCategory = ref<Category>()
const setSelectedCategory = (category: Category) => {
  selectedCategory.value = category
}

const router = useRouter()

const amount = ref(0)
const createTime = ref('')

const entryStore = useEntryStore()
const onSubmitButtonClick = async () => {
  if (!selectedCategory.value) return
  if (entryTabValue.value === 'transfer') return

  const params = {
    category: selectedCategory.value.id,
    amount: amount.value * 100,
    created_at: dayjs(createTime.value).format('YYYY-MM-DD'),
    type: entryTabValue.value,
    property: 2
  }
  await entryStore.createEntry(params)
  await entryStore.getEntryList()
}
</script>
<template>
  <div class="p-6 flex flex-col grow space-y-6">
    <div class="flex space-x-3 items-center">
      <CButton
        icon="ph-arrow-elbow-up-left"
        :show-label="false"
        type="secondary"
        @click="router.back()"
      ></CButton>
      <CDateInput v-model:value="createTime"></CDateInput>
      <CCalculatorInput class="grow" v-model:value="amount"></CCalculatorInput>
      <CButton icon="ph-paper-plane" :show-label="false" @click="onSubmitButtonClick"></CButton>
    </div>

    <CDivider></CDivider>

    <div class="flex space-x-6 items-stretch grow">
      <div class="flex flex-col space-y-6 items-center grow">
        <CTabRadio v-model:value="entryTabValue" :tab-options="entryTabOptions"></CTabRadio>

        <div class="flex gap-3 flex-wrap justify-center" v-if="entryTabValue !== 'transfer'">
          <CCategoryIcon
            v-for="category in categoryListFilteredByEntryType"
            :key="category.id"
            v-bind="category"
            @click="setSelectedCategory(category)"
            :activated="selectedCategory === category"
          ></CCategoryIcon>
        </div>
      </div>

      <CDivider direction="vertical"></CDivider>

      <CPropertyList></CPropertyList>
    </div>
  </div>
</template>
