import { defineStore } from 'pinia'
import { ref, type ComputedRef, computed } from 'vue'

import type { Property, TypeGroupedPropertyList } from '@/types/property'
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

  return { propertyList, getPropertyList, groupedPropertyList }
})
