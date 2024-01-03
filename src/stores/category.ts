import { defineStore } from 'pinia'

import { ref } from 'vue'

import type { Category } from '@/types/category'
import type { User } from '@/types/user'

import { supabase } from '@/lib/supabaseClient'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref<Category[]>([])
  const getCategoryList = async ({ user_id }: { user_id: User['id'] }) => {
    const { data } = await supabase.from('category').select('*').eq('user_id', user_id)
    if (data) categoryList.value = data
  }

  return {
    categoryList,
    getCategoryList
  }
})
