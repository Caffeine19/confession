import { defineStore } from 'pinia'

import { ref } from 'vue'

import { supabase } from '@/lib/supabaseClient'

import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>()

  const login = async (params: { password: string; email: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword(params)
    if (error) {
      const { message } = error
      throw new Error(message)
    }

    user.value = data.user
  }

  return { user, login }
})
