<script setup lang="ts">
import { watch } from 'vue'

import { evaluate } from 'mathjs'

import CInput from '@/components/CInput.vue'

const props = defineProps<{ value: string; calculatedValue: string; isExpressionValid: boolean }>()
const emits = defineEmits(['update:value', 'update:calculatedValue', 'update:isExpressionValid'])

const calculate = (expression: string) => {
  try {
    if (expression.length === 0) return ''

    const newVal = evaluate(expression)
    emits('update:isExpressionValid', true)
    return newVal.toFixed(2).toString()
  } catch (error) {
    emits('update:isExpressionValid', false)
    return error
  }
}

watch(
  () => props.value,
  () => emits('update:calculatedValue', calculate(props.value)),
  {
    immediate: true
  }
)
</script>
<template>
  <CInput
    icon="ph-math-operations"
    @input="(newVal) => $emit('update:value', newVal)"
    :value="value"
  >
    <p class="dark:text-neutral-400" v-if="isExpressionValid">{{ '=' + calculatedValue }}</p>
    <p class="dark:text-red-400 break-keep whitespace-nowrap" v-else>{{ calculatedValue }}</p>
  </CInput>
</template>
