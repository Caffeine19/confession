import { defineStore } from 'pinia'

import { computed, ref, type ComputedRef } from 'vue'

import dayjs from 'dayjs'
import { supabase } from '@/lib/supabaseClient'

import type { DateGroupedEntryList, EntryWithCategory } from '@/types/entry'

export const useEntryStore = defineStore('entry', () => {
  const entryList = ref<EntryWithCategory[]>([])
  const getEntryList = async () => {
    const { data } = await supabase
      .from('entry')
      .select(`id,created_at,amount,type,category (label,icon,id)`)

    if (data) {
      entryList.value = data
    }
  }

  //write by chatgpt,thanks
  const groupedEntryListByDate: ComputedRef<DateGroupedEntryList[]> = computed(() => {
    const groupedEntryList = entryList.value.reduce(
      (acc, entry) => {
        const dateKey = dayjs(entry.created_at).format('YYYY-MM-DD')
        const dateGroup = acc[dateKey] || []
        dateGroup.push(entry)
        acc[dateKey] = dateGroup
        return acc
      },
      {} as Record<string, EntryWithCategory[]>
    )

    return Object.entries(groupedEntryList).map(([date, entryList]) => {
      return {
        date,
        entryList
      }
    })
  })

  return {
    entryList,
    getEntryList,
    groupedEntryListByDate
  }
})
