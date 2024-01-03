import { defineStore } from 'pinia'

import { computed, ref, type ComputedRef } from 'vue'

import dayjs from 'dayjs'
import { supabase } from '@/lib/supabaseClient'

import type { DateGroupedEntryList, Entry, EntryWithCategory, EntryType } from '@/types/entry'

export const useEntryStore = defineStore('entry', () => {
  const entryList = ref<EntryWithCategory[]>([])
  const entryQueryOptions = ref<{ begin: string; end: string }>({
    begin: '2023-01-01',
    end: '2023-12-29'
  })
  const getEntryList = async ({ begin, end }: { begin: string; end: string }) => {
    try {
      const { data, error } = await supabase
        .from('entry')
        .select(`id,created_at,amount,type,property_id,user_id,remark,category (label,icon,id)`)
        .gte('created_at', begin)
        .lte('created_at', end)
      if (error) {
        console.log('🚀 ~ file: entry.ts:19 ~ getEntryList ~ error:', error)
        const { code, message } = error
        throw new Error(code + '~' + message)
      }
      entryList.value = data || []
    } catch (error) {
      console.log('🚀 ~ file: entry.ts:26 ~ getEntryList ~ error:', error)
      throw error
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

  const incomeAndExpenseSummary = ref<{ income: number; expense: number; saving: number }>({
    income: 0,
    expense: 0,
    saving: 0
  })
  const getIncomeAndExpenseSummary = async ({ begin, end }: { begin: string; end: string }) => {
    const task = (type: EntryType) =>
      supabase.rpc('get_summary', {
        begin_date: begin,
        end_date: end,
        summary_type: type
      })

    try {
      const [inputRes, outputRes] = await Promise.all([task('input'), task('output')])

      if (inputRes.error) {
        const { code, message } = inputRes.error
        throw new Error(code + '~' + message)
      }
      if (outputRes.error) {
        const { code, message } = outputRes.error
        throw new Error(code + '~' + message)
      }

      incomeAndExpenseSummary.value = {
        income: inputRes.data,
        expense: outputRes.data,
        saving: inputRes.data - outputRes.data
      }
    } catch (error) {
      console.log('🚀 ~ file: entry.ts:76 ~ getIncomeExpenseSummary ~ error:', error)
      throw error
    }
  }

  const selectedEntry = ref<EntryWithCategory | undefined>()
  const setSelectedEntry = (entry: EntryWithCategory | undefined) => {
    selectedEntry.value = entry
  }

  const createEntry = async (
    params: Pick<
      Entry,
      'amount' | 'category_id' | 'property_id' | 'type' | 'created_at' | 'remark' | 'user_id'
    >
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

  const updateEntry = async ({
    amount,
    remark,
    category_id,
    property_id,
    type,
    created_at,
    id
  }: Pick<
    Entry,
    'id' | 'amount' | 'remark' | 'category_id' | 'property_id' | 'type' | 'created_at'
  >) => {
    try {
      const res = await supabase
        .from('entry')
        .update({ amount, remark, category_id, property_id, type, created_at })
        .match({ id })
      console.log('🚀 ~ file: entry.ts:91 ~ useEntryStore ~ res:', res)
      const { error } = res
      if (error) {
        const { message, code } = error
        throw new Error(code + '~' + message)
      }
    } catch (error) {
      console.log('🚀 ~ file: entry.ts:92 ~ useEntryStore ~ error:', error)
      throw error
    }
  }

  return {
    entryList,
    entryQueryOptions,
    getEntryList,
    groupedEntryListByDate,

    incomeAndExpenseSummary,
    getIncomeAndExpenseSummary,

    selectedEntry,
    setSelectedEntry,

    createEntry,
    deleteEntry,
    updateEntry
  }
})
