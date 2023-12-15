<script setup lang="ts">
import type { TypeGroupedPropertyList } from '@/types/property'

defineProps<{ typeGroupedPropertyList: TypeGroupedPropertyList }>()
</script>
<template>
  <div class="space-y-2">
    <p class="dark:text-neutral-100 text-lg font-normal">
      {{ typeGroupedPropertyList.type }}
    </p>
    <div class="flex flex-col dark:bg-neutral-900 rounded-lg overflow-hidden">
      <div
        v-for="property in typeGroupedPropertyList.propertyList"
        :key="property.id"
        class="flex px-3 group dark:hover:bg-neutral-800 transition-colors"
      >
        <div
          class="flex grow items-center justify-between py-3 border-b dark:border-neutral-800 group-last:border-b-0 group-hover:border-transparent transition-colors space-x-6"
        >
          <p class="dark:text-neutral-200 font-normal text-base whitespace-nowrap">
            {{ property.label }}
          </p>

          <p class="text-base font-normal dark:text-neutral-400">
            {{ (property.amount / 100).toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
