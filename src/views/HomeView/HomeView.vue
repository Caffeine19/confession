<script setup lang="ts">
import { RouterView } from 'vue-router'

import TopBar from './TopBar.vue'
import RouteTabGroup from './RouteTabGroup.vue'
import StatisticPanel from './StatisticPanel.vue'
</script>

<template>
  <div class="dark:bg-neutral-950 w-screen h-screen overflow-hidden flex flex-col">
    <TopBar></TopBar>
    <div class="flex grow">
      <RouteTabGroup></RouteTabGroup>

      <div class="p-6 border-r dark:border-neutral-800">
        <StatisticPanel></StatisticPanel>
      </div>
      <RouterView></RouterView>
    </div>
  </div>
</template>
