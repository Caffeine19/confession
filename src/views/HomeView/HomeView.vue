<script setup lang="ts">
import { ref } from 'vue'

import CLogo from '@/components/CLogo.vue'
import CInput from '@/components/CInput.vue'
import CCalculatorInput from '@/components/CCalculatorInput.vue'

import RouteTabGroup from './RouteTabGroup.vue'

const searchKeyword = ref('')
</script>

<template>
  <div class="dark:bg-neutral-950 w-screen h-screen overflow-hidden flex flex-col">
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
        <i class="ph-fill ph-gear-fine dark:text-neutral-400" style="font-size: 24px"></i>
      </button>
    </div>

    <div class="flex grow">
      <RouteTabGroup></RouteTabGroup>
      <div></div>
      <div class="p-6 flex flex-col grow">
        <div class="">
          <CCalculatorInput></CCalculatorInput>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
