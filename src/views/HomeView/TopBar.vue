<script setup lang="ts">
import { ref } from 'vue'
import CLogo from '@/components/CLogo.vue'
import CInput from '@/components/CInput.vue'
import CButton from '@/components/CButton.vue'
const searchKeyword = ref('')
</script>
<template>
  <div class="border-b dark:border-neutral-800 grid grid-cols-3 px-6 py-3 items-center">
    <CLogo></CLogo>
    <CInput placeholder="Quick Search" v-model:value="searchKeyword" :show-hot-key="true">
      <div class="flex items-center">
        <p class="text-sm font-semibold dark:text-neutral-600">Ctrl+Shift+F</p>
      </div>
    </CInput>

    <CButton icon="ph-gear-fine" type="secondary" class="w-fit justify-self-end"></CButton>
  </div>
</template>
