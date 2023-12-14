<script setup lang="ts">
import type { Category } from '@/types/category'
withDefaults(
  defineProps<
    {
      showLabel?: boolean
      disabled?: boolean
      activated: boolean
    } & Category
  >(),
  { showLabel: true, disabled: false, activated: false }
)
</script>
<template>
  <button
    class="flex items-center rounded-full space-x-1.5 px-1.5 py-1 transition-colors group"
    :class="
      activated
        ? ' dark:bg-cookie-200  dark:hover:bg-cookie-100'
        : ' dark:bg-neutral-900   dark:hover:bg-neutral-800'
    "
  >
    <i
      class="ph-fill transition-colors"
      :class="[
        icon,
        activated
          ? 'dark:text-neutral-950 dark:group-hover:text-neutral-800 '
          : 'dark:text-neutral-300 dark:group-hover:text-neutral-200 '
      ]"
      style="font-size: 24px"
    ></i>
    <p
      class="text-base font-normal transition-colors"
      :class="
        activated
          ? 'dark:text-neutral-950 dark:group-hover:text-neutral-800 '
          : 'dark:text-neutral-300 dark:group-hover:text-neutral-200 '
      "
    >
      {{ label }}
    </p>
  </button>
</template>
