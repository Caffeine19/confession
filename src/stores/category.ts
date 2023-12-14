import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Category } from '@/types/category'
import { supabase } from '@/lib/supabaseClient'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref<Category[]>([])
  const getCategoryList = async () => {
    const { data } = await supabase.from('category').select()
    if (data) categoryList.value = data
  }

  return {
    categoryList,
    getCategoryList
  }
})
