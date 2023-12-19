<script setup lang="ts">
export type Type = 'primary' | 'secondary'

withDefaults(defineProps<{ icon?: string; showLabel?: boolean; label?: string; type?: Type }>(), {
  showLabel: false,
  type: 'primary'
})
defineEmits(['click'])
</script>
<template>
  <button
    class="c-button space-x-3 rounded-lg p-2 flex items-center justify-center transition-colors group"
    :class="
      type === 'primary'
        ? 'dark:bg-cookie-200 dark:hover:bg-cookie-100'
        : 'dark:bg-neutral-900 dark:hover:bg-neutral-800'
    "
    @click="$emit('click')"
  >
    <i
      class="c-button-icon ph transition-colors"
      :class="[
        icon,
        type === 'primary'
          ? 'dark:text-neutral-950 dark:group-hover:text-neutral-800'
          : 'dark:text-neutral-400 dark:group-hover:text-neutral-300'
      ]"
      style="font-size: 24px"
    >
    </i>
    <p
      class="c-button-label text-base font-normal"
      :class="[
        type === 'primary'
          ? 'dark:text-neutral-950 dark:group-hover:text-neutral-800'
          : 'dark:text-neutral-400 dark:group-hover:text-neutral-300'
      ]"
      v-if="showLabel"
    >
      {{ label }}
    </p>
  </button>
</template>
