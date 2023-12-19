import { defineStore } from 'pinia'

import { computed, ref, type ComputedRef } from 'vue'

import dayjs from 'dayjs'
import { supabase } from '@/lib/supabaseClient'

import type { DateGroupedEntryList, Entry, EntryWithCategory } from '@/types/entry'

export const useEntryStore = defineStore('entry', () => {
  const entryList = ref<EntryWithCategory[]>([])
  const getEntryList = async () => {
    const { data } = await supabase
      .from('entry')
      .select(`id,created_at,amount,type,property,remark,category (label,icon,id)`)
    entryList.value = data || []
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

    return (
      Object.entries(groupedEntryList)
        .map(([date, entryList]) => {
          return {
            date,
            entryList
          }
        })
        //sort by date
        .sort((prev, next) => (dayjs(prev.date).isBefore(dayjs(next.date)) ? 1 : -1))
    )
  })

  const createEntry = async (
    params: Pick<Entry, 'amount' | 'category' | 'property' | 'type' | 'created_at' | 'remark'>
  ) => {
    try {
      const res = await supabase.from('entry').insert(params)
      console.log('🚀 ~ file: entry.ts:44 ~ useEntryStore ~ res:', res)
      const { error } = res
      if (error) {
        const { message, code } = error
        throw new Error(code + '~' + message)
      }
    } catch (error) {
      console.log('🚀 ~ file: entry.ts:48 ~ useEntryStore ~ error:', error)
      throw error
    }
  }

  const deleteEntry = async (id: Entry['id']) => {
    try {
      const res = await supabase.from('entry').delete().eq('id', id)
      console.log('🚀 ~ file: entry.ts:66 ~ deleteEntry ~ res:', res)
      const { error } = res
      if (error) {
        const { message, code } = error
        throw new Error(code + '~' + message)
      }
    } catch (error) {
      console.log('🚀 ~ file: entry.ts:67 ~ deleteEntry ~ error:', error)
      throw error
    }
  }

  return {
    entryList,
    getEntryList,
    groupedEntryListByDate,
    createEntry,
    deleteEntry
  }
})
