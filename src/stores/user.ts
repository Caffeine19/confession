import { defineStore } from 'pinia'

import { ref } from 'vue'

import { supabase } from '@/lib/supabaseClient'

import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User>()

  const login = async (params: Required<Pick<User, 'email'>> & { password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword(params)
    if (error) {
      const { message } = error
      throw new Error(message)
    }
    user.value = data.user
  }

  const register = async (params: Required<Pick<User, 'email'>> & { password: string }) => {
    const { data, error } = await supabase.auth.signUp(params)
    if (error) {
      const { message } = error
      throw new Error(message)
    }
    if (data.user) user.value = data.user
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      const { message } = error
      throw new Error(message)
    }
  }

  return { user, login, register, signOut }
})
