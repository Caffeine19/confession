<script setup lang="ts">
import dayjs from 'dayjs'

import type { DateGroupedEntryList, EntryWithCategory } from '@/types/entry'

defineProps<{ dateGroupedEntryList: DateGroupedEntryList }>()
defineEmits<{ 'entry-click': [val: EntryWithCategory] }>()
</script>
<template>
  <div class="space-y-2">
    <p class="dark:text-neutral-100 text-lg font-normal">
      {{ dayjs(dateGroupedEntryList.date).format('DD/MM') }}
    </p>
    <div class="flex flex-col dark:bg-neutral-900 rounded-lg overflow-hidden">
      <div
        v-for="entry in dateGroupedEntryList.entryList"
        :key="entry.id"
        class="flex px-3 group dark:hover:bg-neutral-800 transition-colors cursor-pointer"
        @click="$emit('entry-click', entry)"
      >
        <div
          class="flex grow items-center justify-between py-3 border-b dark:border-neutral-800 group-last:border-b-0 group-hover:border-transparent transition-colors"
        >
          <div class="flex items-center space-x-2">
            <div class="rounded-full dark:bg-cookie-200 flex items-center justify-center p-1">
              <i
                class="ph-fill dark:text-neutral-950"
                :class="entry.category?.icon"
                style="font-size: 24px"
              ></i>
            </div>

            <p class="dark:text-neutral-200 font-normal text-base">{{ entry.category?.label }}</p>
          </div>
          <p
            class="text-base font-normal"
            :class="entry.type === 'output' ? 'dark:text-guilty-400' : 'dark:text-yokatta-300'"
          >
            {{ (entry.type === 'output' ? '-' : '+') + (entry.amount / 100).toFixed(2) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
