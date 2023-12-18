<script setup lang="ts">
import dayjs from 'dayjs'

import CInput from './CInput.vue'

defineProps<{ value: any }>()
const emits = defineEmits<{ 'update:value': [val: string] }>()

const parseDateWithDefaultYear = (dateString: string) => {
  const currentDate = dayjs()
  const parsedDate = dayjs(dateString, 'MM-DD')

  if (parsedDate.isValid()) {
    if (parsedDate.year() === 2001) {
      console.log(parsedDate.year(), dayjs().year())

      return parsedDate.year(currentDate.year()).format('YYYY-MM-DD')
    } else {
      return parsedDate.format('YYYY-MM-DD')
    }
  } else {
    console.error('Invalid date string')

    return ''
  }
}

const onChange = (newVal: string) => {
  emits('update:value', parseDateWithDefaultYear(newVal))
}
</script>
<template>
  <CInput :value="value" icon="ph-calendar-plus" @change="onChange"></CInput>
</template>
