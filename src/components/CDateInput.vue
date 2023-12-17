<script setup lang="ts">
import dayjs from 'dayjs'

import CInput from './CInput.vue'

defineProps<{ value: any }>()
defineEmits(['update:value'])
</script>
<template>
  <CInput
    :value="value"
    icon="ph-calendar-plus"
    @change="(newVal) => $emit('update:value', dayjs(newVal).format('DD-MM-YYYY'))"
  ></CInput>
</template>
