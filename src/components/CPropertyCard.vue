<script setup lang="ts">
import type { Property, TypeGroupedPropertyList } from '@/types/property'

defineProps<{
  typeGroupedPropertyList: TypeGroupedPropertyList
  activatedPropertyId?: Property['id']
}>()
defineEmits<{ 'property-click': [val: Property] }>()
</script>
<template>
  <div class="space-y-2">
    <p class="dark:text-neutral-100 text-lg font-normal">
      {{ typeGroupedPropertyList.type }}
    </p>
    <div class="flex flex-col rounded-lg overflow-hidden">
      <div
        v-for="property in typeGroupedPropertyList.propertyList"
        :key="property.id"
        class="flex px-3 group transition-colors cursor-pointer"
        :class="
          activatedPropertyId === property.id
            ? 'dark:bg-cookie-200 dark:hover:bg-cookie-100'
            : 'dark:bg-neutral-900 dark:hover:bg-neutral-800'
        "
        @click="$emit('property-click', property)"
      >
        <div
          class="flex grow items-center justify-between py-3 border-b group-last:border-b-0 group-hover:border-transparent transition-colors space-x-6"
          :class="
            activatedPropertyId === property.id
              ? 'dark:border-cookie-200'
              : 'dark:border-neutral-800'
          "
        >
          <p
            class="font-normal text-base whitespace-nowrap"
            :class="
              activatedPropertyId === property.id
                ? 'dark:text-neutral-950'
                : 'dark:text-neutral-200'
            "
          >
            {{ property.label }}
          </p>

          <p
            class="text-base font-normal"
            :class="
              activatedPropertyId === property.id
                ? 'dark:text-neutral-600'
                : 'dark:text-neutral-400'
            "
          >
            {{ (property.amount / 100).toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
