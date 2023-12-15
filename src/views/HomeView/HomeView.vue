<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

import CDivider from '@/components/CDivider.vue'
import CEntryList from '@/components/CEntryList.vue'
import CButton from '@/components/CButton.vue'

import TopBar from './TopBar.vue'
import RouteTabGroup from './RouteTabGroup.vue'
import StatisticPanel from './StatisticPanel.vue'

const router = useRouter()
const goToCreateEntry = () => {
  router.push({ name: 'createEntry' })
}
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
        <CEntryList class="overflow-y-auto"></CEntryList>
        <CDivider></CDivider>
        <CButton icon=" ph-plus" @click="goToCreateEntry" class="w-fit mx-auto"></CButton>
      </div>

      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
.c-button {
  @apply rounded-full;
}
</style>
