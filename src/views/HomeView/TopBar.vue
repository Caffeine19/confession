<script setup lang="ts">
import { ref } from 'vue'
import CLogo from '@/components/CLogo.vue'
import CInput from '@/components/CInput.vue'
const searchKeyword = ref('')
</script>
<template>
  <div class="border-b dark:border-neutral-800 grid grid-cols-3 px-6 py-3">
    <CLogo></CLogo>
    <CInput placeholder="Quick Search" v-model:value="searchKeyword" :show-hot-key="true">
      <div class="flex items-center">
        <p class="text-sm font-semibold dark:text-neutral-600">Ctrl+Shift+F</p>
      </div>
    </CInput>

    <button
      class="flex items-center justify-center dark:bg-neutral-900 p-2 rounded-lg w-fit justify-self-end"
    >
      <i class="ph ph-gear-fine dark:text-neutral-400" style="font-size: 24px"></i>
    </button>
  </div>
</template>
