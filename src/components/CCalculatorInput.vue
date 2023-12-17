<script setup lang="ts">
import { ref, computed } from 'vue'

import { evaluate } from 'mathjs'

import CInput from '@/components/CInput.vue'

const props = defineProps<{ value: any }>()
defineEmits(['update:value'])

const predictedResult = computed(() => calculate(props.value.toString()))
const isExpressionValid = ref(true)

const calculate = (expression: string) => {
  try {
    if (expression.length === 0) return ''

    const newVal = evaluate(expression)
    isExpressionValid.value = true
    return '=' + newVal.toFixed(2).toString()
  } catch (error) {
    isExpressionValid.value = false
    return error
  }
}
</script>
<template>
  <CInput
    icon="ph-math-operations"
    @input="(newVal) => $emit('update:value', newVal)"
    :value="value"
  >
    <p class="dark:text-neutral-400" v-if="isExpressionValid">{{ predictedResult }}</p>
    <p class="dark:text-red-400 break-keep whitespace-nowrap" v-else>{{ predictedResult }}</p>
  </CInput>
</template>
