<script setup lang="ts">
import { computed, toRefs } from 'vue'
const props = withDefaults(
  defineProps<{ direction?: 'vertical' | 'horizontal'; type?: 'primary' | 'secondary' }>(),
  {
    direction: 'horizontal',
    type: 'primary'
  }
)

const { direction, type } = toRefs(props)

const dividerColor = computed(() => {
  if (type.value === 'primary') return 'dark:border-neutral-800'
  if (type.value === 'secondary') return 'dark:border-neutral-600'
  return ''
})

const dividerBorderDirection = computed(() => {
  if (direction.value === 'horizontal') return 'border-b'
  if (direction.value === 'vertical') return 'border-l'
  return ''
})
</script>
<template>
  <div :class="[dividerColor, dividerBorderDirection]" class="transition-colors"></div>
</template>
