<script setup lang="ts">
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import CInput from '@/components/CInput.vue'
import CButton from '@/components/CButton.vue'
import CTabRadio, { type TabOption } from '@/components/CTabRadio.vue'

import { useUserStore } from '@/stores/user'

import { useInjectMessenger } from '@/hooks/useMessenger'

const userStore = useUserStore()

const { showMessenger } = useInjectMessenger()

const router = useRouter()

type BeginType = 'register' | 'login'
const beginType = ref<BeginType>('login')
const beginTypeOptions: TabOption<BeginType>[] = [
  { label: 'Register', value: 'register' },
  { label: 'Login', value: 'login' }
]

const username = ref('')
const email = ref('')
const password = ref('')

const onSubmitButtonClick = async () => {
  if (beginType.value === 'login') {
    try {
      await userStore.login({ password: password.value, email: email.value })
      showMessenger({ status: true, text: 'login successfully' })
      setTimeout(() => router.push({ name: 'home' }), 1500)
    } catch (error) {
      showMessenger({ status: false, text: (error as Error).message })
    }
  }
}
</script>
<template>
  <div class="flex items-center justify-center relative w-screen h-screen">
    <div></div>
    <div
      class="dark:bg-neutral-950 border dark:border-neutral-800 rounded-xl flex flex-col h-1/2 justify-between p-6 absolute top-1/2 -translate-y-1/2 right-1/4"
    >
      <div class="flex items-center justify-between space-x-12">
        <div class="dark:text-neutral-50 flex items-center space-x-3">
          <i class="ph ph-wave-sine" style="font-size: 24px"></i>
          <p class="text-lg font-medium">Getting started</p>
        </div>

        <CTabRadio v-model:value="beginType" :tab-options="beginTypeOptions"></CTabRadio>
      </div>

      <div class="flex flex-col space-y-6">
        <CInput v-model:value="email" icon="ph-envelope" placeholder="Email"></CInput>
        <CInput
          v-model:value="username"
          icon="ph-user-circle"
          placeholder="Username"
          v-if="beginType === 'register'"
        ></CInput>
        <CInput v-model:value="password" icon="ph-key" placeholder="Password"></CInput>
        <a class="text-sm dark:text-cookie-200 text-center">Forget your password?</a>
        <CButton
          label="Submit"
          :show-label="true"
          icon="ph-paper-plane"
          @click="onSubmitButtonClick"
        ></CButton>
      </div>
    </div>
  </div>
</template>
