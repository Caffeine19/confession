import { defineStore } from 'pinia'
import { ref, type ComputedRef, computed } from 'vue'

import type { Property, TypeGroupedPropertyList } from '@/types/property'
import type { Entry } from '@/types/entry'

import { supabase } from '@/lib/supabaseClient'

export const usePropertyStore = defineStore('property', () => {
  const propertyList = ref<Property[]>([])
  const getPropertyList = async () => {
    const { data } = await supabase.from('property').select('*')
    propertyList.value = data || []
  }

  const order: Record<Property['type'], number> = {
    credit: 1,
    debit: 2,
    investment: 3,
    other: 4
  }
  const sortPropertyListByType = (list: TypeGroupedPropertyList[]) => {
    return list.sort((prev, next) => {
      return order[prev.type] - order[next.type]
    })
  }

  const groupedPropertyList: ComputedRef<TypeGroupedPropertyList[]> = computed(() => {
    const groupedPropertyList = propertyList.value.reduce(
      (acc, property) => {
        const type = property.type
        const typeGroup = acc[type] || []
        typeGroup.push(property)
        acc[type] = typeGroup
        return acc
      },
      {} as Record<Property['type'], Property[]>
    )

    return sortPropertyListByType(
      Object.entries(groupedPropertyList).map(([type, propertyList]) => {
        return {
          type: type as Property['type'],
          propertyList
        }
      })
    )
  })

  const updatePropertyAmount = async ({
    id,
    oldAmount,
    changedAmount,
    type
  }: {
    id: Property['id']
    oldAmount: Property['amount']
    changedAmount: Entry['amount']
    type: Entry['type']
  }) => {
    try {
      const newAmount = oldAmount + (type === 'input' ? changedAmount : -changedAmount)

      const res = await supabase
        .from('property')
        .update({ amount: newAmount })
        .match({ id })
        .select('amount')
      const { error, data } = res
      if (error) {
        const { message, code } = error
        throw new Error(code + '~' + message)
      }

      return data
    } catch (error) {
      console.log('🚀 ~ file: property.ts:38 ~ updatePropertyAmount ~ error:', error)
      throw error
    }
  }

  return { propertyList, getPropertyList, groupedPropertyList, updatePropertyAmount }
})
