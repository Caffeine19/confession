<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
import CDivider from './CDivider.vue'

import { useInjectMessenger } from '@/hooks/useMessenger'

const { messengerOptions } = useInjectMessenger()

const messengerRef = ref<null | HTMLElement>(null)
const messengerLeft = ref(0)

watch(
  () => messengerOptions?.value.show,
  (newVal) => {
    nextTick(() => {
      if (!messengerRef.value) return
      if (!newVal) return
      messengerLeft.value = window.innerWidth / 2 - messengerRef.value.clientWidth / 2
    })
  }
)
</script>
<template>
  <transition>
    <div
      class="flex items-stretch rounded-lg fixed top-12 p-2 space-x-3"
      :class="messengerOptions?.status ? 'dark:bg-yokatta-100' : 'dark:bg-guilty-100'"
      v-if="messengerOptions?.show"
      ref="messengerRef"
      :style="{
        left: messengerLeft + 'px'
      }"
    >
      <i
        class="ph"
        style="font-size: 24px"
        :class="
          messengerOptions?.status
            ? 'ph-flower-tulip dark:text-yokatta-800'
            : 'ph-campfire dark:text-guilty-800'
        "
      ></i>
      <CDivider
        direction="vertical"
        :color="messengerOptions?.status ? 'dark:border-yokatta-800' : 'dark:border-guilty-800'"
      ></CDivider>

      <p
        class="text-base font-normal"
        :class="messengerOptions?.status ? 'dark:text-yokatta-800' : 'dark:text-guilty-800'"
      >
        {{ messengerOptions?.text }}
      </p>
    </div>
  </transition>
</template>
<style>
.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}
</style>
