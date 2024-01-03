<script setup lang="ts">
import { reactive } from 'vue'

import { useRouter } from 'vue-router'

import RouteTab, { type RouteTabProps } from './RouteTab.vue'

import { useUserStore } from '@/stores/user'

const router = useRouter()

const userStore = useUserStore()

const routeTabOptions = reactive<RouteTabProps[]>([
  {
    icon: 'ph-bank',
    label: 'Home',
    action: () => router.push({ name: 'home' })
  },
  {
    icon: 'ph-cardholder',
    label: 'Property',

    action: () => router.push({ name: 'home' })
  },

  {
    icon: 'ph-map-trifold',
    label: 'Budget',

    action: () => router.push({ name: 'home' })
  },

  {
    icon: 'ph-swatches',
    label: 'Category',

    action: () => router.push({ name: 'home' })
  }
])

const signOutTabOption: RouteTabProps = {
  icon: 'ph-door',
  label: 'SignOut',
  action: async () => {
    await userStore.signOut()
    router.replace({ name: 'begin' })
  }
}
</script>
<template>
  <div class="p-6 border-r dark:border-neutral-800 flex flex-col justify-between">
    <div class="space-y-6">
      <RouteTab
        v-for="(routeTabOption, index) in routeTabOptions"
        :key="index"
        :icon="routeTabOption.icon"
        :label="routeTabOption.label"
        :action="routeTabOption.action"
      ></RouteTab>
    </div>

    <RouteTab
      :icon="signOutTabOption.icon"
      :label="signOutTabOption.label"
      :action="signOutTabOption.action"
    ></RouteTab>
  </div>
</template>
