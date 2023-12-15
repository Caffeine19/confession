<script setup lang="ts">
import { onMounted } from 'vue'

import { storeToRefs } from 'pinia'

import { usePropertyStore } from '@/stores/property'

import CPropertyCard from './CPropertyCard.vue'
const propertyStore = usePropertyStore()
const { groupedPropertyList } = storeToRefs(propertyStore)

onMounted(() => {
  propertyStore.getPropertyList()
})
</script>
<template>
  <div class="flex flex-col space-y-4">
    <CPropertyCard
      v-for="(list, index) in groupedPropertyList"
      :key="index"
      :type-grouped-property-list="list"
    ></CPropertyCard>
  </div>
</template>
