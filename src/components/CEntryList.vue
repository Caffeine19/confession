<script setup lang="ts">
import { onMounted } from 'vue'

import { storeToRefs } from 'pinia'

import { useEntryStore } from '@/stores/entry'

import CEntryCard from './CEntryCard.vue'

const entryStore = useEntryStore()
const { groupedEntryListByDate } = storeToRefs(entryStore)

onMounted(() => {
  entryStore.getEntryList()
})
</script>
<template>
  <div class="flex flex-col space-y-4">
    <CEntryCard
      v-for="(list, index) in groupedEntryListByDate"
      :key="index"
      :date-grouped-entry-list="list"
    ></CEntryCard>
  </div>
</template>
