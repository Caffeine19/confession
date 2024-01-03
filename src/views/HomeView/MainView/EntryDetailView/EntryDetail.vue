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

import { type EntryType } from '@/types/entry'
import type { Category } from '@/types/category'

import { useCategoryStore } from '@/stores/category'
import { useEntryStore } from '@/stores/entry'
import { useUserStore } from '@/stores/user'

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
const { selectedEntry, entryQueryOptions } = storeToRefs(entryStore)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

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

        category_id: selectedCategory.value.id,
        amount: Number(calculatedAmount.value) * 100,
        created_at: dayjs(createTime.value).format('YYYY-MM-DD'),
        type: entryType.value,
        property_id: selectedProperty.value.id,
        remark: remark.value
      })
      entryStore.getEntryList(entryQueryOptions.value)

      //反转上一次的结果
      const [{ amount: UpdatedAmount }] = await propertyStore.updatePropertyAmount({
        id: selectedEntry.value.property_id,
        oldAmount: selectedProperty.value.amount,
        changedAmount: selectedEntry.value.amount,
        type: selectedEntry.value.type === 'input' ? 'output' : 'input'
      })

      //添加新一次的结果
      await propertyStore.updatePropertyAmount({
        id: selectedProperty.value.id,

        //如果选择的资产和上一次的资产相同，那么就用修改反转后的上次资产的金额，否则就用现在新选中的资产的金额
        oldAmount:
          selectedEntry.value.property_id === selectedProperty.value.id
            ? UpdatedAmount
            : selectedProperty.value.amount,

        changedAmount: Number(calculatedAmount.value) * 100,
        type: entryType.value
      })
      propertyStore.getPropertyList()
    } else {
      if (!user.value?.id) return

      await entryStore.createEntry({
        category_id: selectedCategory.value.id,
        amount: Number(calculatedAmount.value) * 100,
        created_at: dayjs(createTime.value).format('YYYY-MM-DD'),
        type: entryType.value,
        property_id: selectedProperty.value.id,
        remark: remark.value,
        user_id: user.value?.id
      })
      entryStore.getEntryList(entryQueryOptions.value)

      await propertyStore.updatePropertyAmount({
        id: selectedProperty.value.id,
        oldAmount: selectedProperty.value.amount,
        changedAmount: Number(calculatedAmount.value) * 100,
        type: entryType.value
      })
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

const setEntryDetail = () => {
  if (!selectedEntry.value) return

  entryType.value = selectedEntry.value.type
  selectedCategory.value = categoryList.value.find(
    (category) => category.id === selectedEntry.value?.category?.id
  )
  selectedProperty.value = propertyList.value.find(
    (property) => property.id === selectedEntry.value?.property_id
  )
  amount.value = (selectedEntry.value.amount / 100).toString()
  calculatedAmount.value = (selectedEntry.value.amount / 100).toString()
  createTime.value = dayjs(selectedEntry.value.created_at).format('YYYY-MM-DD')
  remark.value = selectedEntry.value.remark || ''
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
      setEntryDetail()
    } else {
      //可能从详情页跳转到新增页，所以需要重置
      resetEntryDetail()
    }
  },
  {
    immediate: true
  }
)

const onDeleteButtonClick = async () => {
  if (!selectedEntry.value || !selectedProperty.value) return

  try {
    await entryStore.deleteEntry(selectedEntry.value.id)
    entryStore.getEntryList(entryQueryOptions.value)

    //删除交易后，需要撤销交易对应的资产的金额
    await propertyStore.updatePropertyAmount({
      id: selectedEntry.value.property_id,
      oldAmount: selectedProperty.value.amount,
      changedAmount: selectedEntry.value.amount,
      type: selectedEntry.value.type === 'input' ? 'output' : 'input'
    })
    propertyStore.getPropertyList()
    resetEntryDetail()

    showMessenger({ status: true, text: 'Delete entry successfully' })
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
          v-if="selectedEntry"
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
