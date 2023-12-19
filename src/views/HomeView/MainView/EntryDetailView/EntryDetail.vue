<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs'

import CCalculatorInput from '@/components/CCalculatorInput.vue'
import CDateInput from '@/components/CDateInput.vue'
import CButton from '@/components/CButton.vue'
import CDivider from '@/components/CDivider.vue'
import CTabRadio, { type TabOption } from '@/components/CTabRadio.vue'
import CCategoryIcon from '@/components/CCategoryIcon.vue'
import CInput from '@/components/CInput.vue'
import CPropertyCard from '@/components/CPropertyCard.vue'

import { type Entry, type EntryType, type EntryWithCategory } from '@/types/entry'
import type { Category } from '@/types/category'

import { useCategoryStore } from '@/stores/category'
import { useEntryStore } from '@/stores/entry'

import { useInjectMessenger } from '@/hooks/useMessenger'
import type { Property } from '@/types/property'
import { usePropertyStore } from '@/stores/property'

const router = useRouter()
const route = useRoute()

const goToEntryStatistics = () => {
  router.push({ name: 'entryStatistic' })
}

const categoryStore = useCategoryStore()
const { categoryList } = storeToRefs(categoryStore)
onMounted(() => {
  categoryStore.getCategoryList()
})
const categoryListFilteredByEntryType = computed(() => {
  return categoryList.value.filter((category) => category.type === entryType.value)
})

const propertyStore = usePropertyStore()
const { groupedPropertyList, propertyList } = storeToRefs(propertyStore)
onMounted(() => {
  propertyStore.getPropertyList()
})

const entryStore = useEntryStore()
const { entryList } = storeToRefs(entryStore)

//交易类型
const entryType = ref<EntryType>('output')
const entryTypeOptions: TabOption<EntryType>[] = [
  { label: 'Output', value: 'output' },
  { label: 'Input', value: 'input' },
  { label: 'Transfer', value: 'transfer' }
]

//交易类别
const selectedCategory = ref<Category>()
const setSelectedCategory = (category: Category) => {
  selectedCategory.value = category
}

//资产
const selectedProperty = ref<Property>()
const setSelectedProperty = (property: Property) => {
  selectedProperty.value = property
}

//金额
const amount = ref('')
const calculatedAmount = ref('')
const isExpressionValid = ref(false)

//日期
const createTime = ref('')

//备注
const remark = ref('')

const { showMessenger } = useInjectMessenger()

const onSubmitButtonClick = async () => {
  try {
    //验证金额的输入是否正确
    if (isExpressionValid.value === false) throw new Error('amount invalid')
    //验证是否选择了分类
    if (!selectedCategory.value) throw new Error('category unSelected')
    //验证是否输入了日期
    if (!createTime.value) throw new Error('createTime unSelected')
    //验证是否选择了资产
    if (!selectedProperty.value) throw new Error('property unSelected')

    if (entryType.value === 'transfer') return

    if (selectedEntry.value) {
      await entryStore.updateEntry({
        id: selectedEntry.value.id,

        category: selectedCategory.value.id,
        amount: Number(calculatedAmount.value) * 100,
        created_at: dayjs(createTime.value).format('YYYY-MM-DD'),
        type: entryType.value,
        property: selectedProperty.value.id,
        remark: remark.value
      })

      //反转上一次的结果
      await propertyStore.updatePropertyAmount({
        id: selectedEntry.value.property,
        amount: selectedEntry.value.amount,
        type: selectedEntry.value.type === 'input' ? 'output' : 'input'
      })
      await propertyStore.getPropertyList()

      //添加新一次的结果
      await propertyStore.updatePropertyAmount({
        id: selectedProperty.value.id,
        amount: Number(calculatedAmount.value) * 100,
        type: entryType.value
      })
      propertyStore.getPropertyList()

      entryStore.getEntryList()
    } else {
      await entryStore.createEntry({
        category: selectedCategory.value.id,
        amount: Number(calculatedAmount.value) * 100,
        created_at: dayjs(createTime.value).format('YYYY-MM-DD'),
        type: entryType.value,
        property: selectedProperty.value.id,
        remark: remark.value
      })

      await propertyStore.updatePropertyAmount({
        id: selectedProperty.value.id,
        amount: Number(calculatedAmount.value) * 100,
        type: entryType.value
      })

      entryStore.getEntryList()
      propertyStore.getPropertyList()
    }

    showMessenger({
      status: true,
      text: `${selectedEntry.value ? 'Update' : 'Create'} entry successfully`
    })
  } catch (error) {
    showMessenger({
      status: false,
      text: `${selectedEntry.value ? 'Update' : 'Create'} entry failed~` + (error as Error).message
    })
  }
}

const selectedEntry = ref<EntryWithCategory>()

const setEntryDetail = (id: Entry['id']) => {
  const entry = entryList.value.find((e) => {
    return e.id === id
  })

  if (!entry) return

  selectedEntry.value = entry

  entryType.value = entry.type
  selectedCategory.value = categoryList.value.find((category) => category.id === entry.category?.id)
  selectedProperty.value = propertyList.value.find((property) => property.id === entry.property)
  amount.value = (entry.amount / 100).toString()
  calculatedAmount.value = (entry.amount / 100).toString()
  createTime.value = entry.created_at
  remark.value = entry.remark || ''
}

const resetEntryDetail = () => {
  selectedEntry.value = undefined

  entryType.value = 'output'
  selectedCategory.value = undefined
  selectedProperty.value = undefined
  amount.value = ''
  calculatedAmount.value = ''
  createTime.value = ''
  remark.value = ''
}

watch(
  () => route.params.id,
  (newVal) => {
    console.log('🚀 ~ file: EntryDetail.vue:181 ~ newVal:', newVal)
    if (newVal) {
      setEntryDetail(Number(newVal))
    } else {
      resetEntryDetail()
    }
  },
  {
    immediate: true
  }
)

const onDeleteButtonClick = async () => {
  if (!selectedEntry.value) return
  try {
    await entryStore.deleteEntry(selectedEntry.value.id)
    showMessenger({ status: true, text: 'Delete entry successfully' })

    resetEntryDetail()
    await entryStore.getEntryList()
  } catch (error) {
    showMessenger({ status: false, text: 'Delete entry failed~' + (error as Error).message })
  }
}
</script>
<template>
  <div class="p-6 flex flex-col grow space-y-6">
    <div class="space-y-3">
      <div class="flex space-x-3 items-center">
        <CButton
          icon="ph-arrow-elbow-up-left"
          :show-label="false"
          type="secondary"
          @click="goToEntryStatistics"
        ></CButton>
        <CDateInput v-model:value="createTime" placeholder="Select date"></CDateInput>
        <CCalculatorInput
          class="grow"
          v-model:value="amount"
          v-model:calculated-value="calculatedAmount"
          v-model:is-expression-valid="isExpressionValid"
          placeholder="Input amount"
        ></CCalculatorInput>
        <CButton icon="ph-paper-plane" :show-label="false" @click="onSubmitButtonClick"></CButton>
      </div>
      <div class="flex items-center space-x-3">
        <CButton
          icon="ph-trash"
          :show-label="true"
          label="Delete"
          @click="onDeleteButtonClick"
          type="secondary"
        ></CButton>
        <CInput v-model:value="remark" icon="ph-note" placeholder="Remark" class="grow"></CInput>
      </div>
    </div>

    <CDivider></CDivider>

    <div class="flex space-x-6 items-stretch grow">
      <div class="flex flex-col space-y-6 items-center grow">
        <CTabRadio v-model:value="entryType" :tab-options="entryTypeOptions"></CTabRadio>

        <div class="flex gap-3 flex-wrap justify-center" v-if="entryType !== 'transfer'">
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

      <div class="flex flex-col space-y-4">
        <CPropertyCard
          v-for="(list, index) in groupedPropertyList"
          :key="index"
          :type-grouped-property-list="list"
          @property-click="setSelectedProperty"
          :activated-property-id="selectedProperty?.id"
        ></CPropertyCard>
      </div>
    </div>
  </div>
</template>
