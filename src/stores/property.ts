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

    return Object.entries(groupedPropertyList).map(([type, propertyList]) => {
      return {
        type: type as Property['type'],
        propertyList
      }
    })
  })

  const updatePropertyAmountWhenCreateEntry = async ({
    id,
    amount,
    type
  }: Pick<Property, 'id' | 'amount'> & Pick<Entry, 'type'>) => {
    try {
      const oldAmount = propertyList.value.find((property) => property.id === id)?.amount || 0
      const newAmount = oldAmount + (type === 'input' ? amount : -amount)

      const res = await supabase.from('property').update({ amount: newAmount }).match({ id })
      const { error } = res
      if (error) {
        const { message, code } = error
        throw new Error(code + '~' + message)
      }
    } catch (error) {
      console.log('🚀 ~ file: property.ts:38 ~ updatePropertyAmount ~ error:', error)
      throw error
    }
  }

  return { propertyList, getPropertyList, groupedPropertyList, updatePropertyAmountWhenCreateEntry }
})
