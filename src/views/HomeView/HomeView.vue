<script setup lang="ts">
import { ref, onMounted, computed, type ComputedRef } from 'vue'

import { RouterView, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import CDivider from '@/components/CDivider.vue'
import CButton from '@/components/CButton.vue'
import CEntryCard from '@/components/CEntryCard.vue'
import CDateInput from '@/components/CDateInput.vue'

import TopBar from './TopBar.vue'
import RouteTabGroup from './RouteTabGroup.vue'
import StatisticPanel, { type StatisticOption } from './StatisticPanel.vue'

import { useEntryStore } from '@/stores/entry'

import type { EntryWithCategory } from '@/types/entry'

import { useInjectMessenger } from '@/hooks/useMessenger'

import { addThousandsSeparator } from '@/utils/addThousandsSeparator'

const entryStore = useEntryStore()
const { groupedEntryListByDate, entryQueryOptions, incomeAndExpenseSummary } =
  storeToRefs(entryStore)

const { showMessenger } = useInjectMessenger()

onMounted(async () => {
  try {
    await entryStore.getEntryList(entryQueryOptions.value)
  } catch (error) {
    console.log('🚀 ~ file: HomeView.vue:31 ~ getEntryList ~ error:', error)
    showMessenger({ status: false, text: (error as Error).message })
  }
})

const router = useRouter()
const goToEntryDetail = (entry?: EntryWithCategory) => {
  router.push({ name: 'entryDetail', params: { id: entry?.id } })
  entryStore.setSelectedEntry(entry)
}

const searchDate = ref('')

const incomeAndExpenseStatisticOptions: ComputedRef<StatisticOption[]> = computed(() => [
  { label: 'Income', value: addThousandsSeparator(incomeAndExpenseSummary.value.income) },
  { label: 'Expense', value: addThousandsSeparator(incomeAndExpenseSummary.value.expense) },
  { label: 'Saving', value: addThousandsSeparator(incomeAndExpenseSummary.value.saving) }
])

onMounted(() => entryStore.getIncomeAndExpenseSummary(entryQueryOptions.value))
</script>

<template>
  <div class="dark:bg-neutral-950 w-screen h-screen overflow-hidden flex flex-col">
    <TopBar></TopBar>
    <div class="flex grow overflow-hidden">
      <RouteTabGroup></RouteTabGroup>

      <div
        class="p-6 border-r dark:border-neutral-800 space-y-4 flex flex-col items-stretch overflow-hidden shrink-0"
      >
        <StatisticPanel :statistic-options="incomeAndExpenseStatisticOptions"></StatisticPanel>
        <CDivider></CDivider>

        <div class="flex items-center justify-between space-x-4">
          <CDateInput :value="searchDate" class="grow"></CDateInput>
          <CButton icon="ph-plus" @click="goToEntryDetail"></CButton>
        </div>

        <div class="flex flex-col space-y-4 overflow-y-auto custom-scrollbar">
          <CEntryCard
            v-for="(list, index) in groupedEntryListByDate"
            :key="index"
            :date-grouped-entry-list="list"
            @entry-click="(entry) => goToEntryDetail(entry)"
          ></CEntryCard>
        </div>
      </div>

      <RouterView></RouterView>
    </div>
  </div>
</template>
