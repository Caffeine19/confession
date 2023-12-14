<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { RouterView } from 'vue-router'

import CDivider from '@/components/CDivider.vue'

import TopBar from './TopBar.vue'
import RouteTabGroup from './RouteTabGroup.vue'
import StatisticPanel from './StatisticPanel.vue'

import { supabase } from '@/lib/supabaseClient'

const countries = ref<any>([])

async function getCountries() {
  const { data } = await supabase.from('countries').select()
  if (data) countries.value = data
}

onMounted(() => {
  getCountries()
})
</script>

<template>
  <div class="dark:bg-neutral-950 w-screen h-screen overflow-hidden flex flex-col">
    <TopBar></TopBar>
    <div class="flex grow">
      <RouteTabGroup></RouteTabGroup>

      <div class="p-6 border-r dark:border-neutral-800 space-y-4">
        <StatisticPanel></StatisticPanel>
        <CDivider></CDivider>
      </div>
      <RouterView></RouterView>
    </div>
  </div>
</template>
