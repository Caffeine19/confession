import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Category } from '@/types/category'

import { defaultCategoryList } from '@/mock/category'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref<Category[]>([])
  const getCategoryList = () => {
    categoryList.value = defaultCategoryList
  }

  return {
    categoryList,
    getCategoryList
  }
})
