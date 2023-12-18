<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import CDivider from '@/components/CDivider.vue'
import CEntryList from '@/components/CEntryList.vue'
import CButton from '@/components/CButton.vue'

import TopBar from './TopBar.vue'
import RouteTabGroup from './RouteTabGroup.vue'
import StatisticPanel from './StatisticPanel.vue'
import CDateInput from '@/components/CDateInput.vue'

const router = useRouter()
const goToCreateEntry = () => {
  router.push({ name: 'createEntry' })
}

const searchDate = ref('')
</script>

<template>
  <div class="dark:bg-neutral-950 w-screen h-screen overflow-hidden flex flex-col">
    <TopBar></TopBar>
    <div class="flex grow overflow-hidden">
      <RouteTabGroup></RouteTabGroup>

      <div
        class="p-6 border-r dark:border-neutral-800 space-y-4 flex flex-col items-stretch overflow-hidden shrink-0"
      >
        <StatisticPanel></StatisticPanel>
        <CDivider></CDivider>

        <div class="flex items-center justify-between space-x-4">
          <CDateInput :value="searchDate" class="grow"></CDateInput>
          <CButton icon="ph-plus" @click="goToCreateEntry"></CButton>
        </div>

        <CEntryList class="overflow-y-auto custom-scrollbar"></CEntryList>
      </div>

      <RouterView></RouterView>
    </div>
  </div>
</template>
