<script setup lang="ts">
import { ref } from 'vue'

import dayjs from 'dayjs'

import CInput from './CInput.vue'

const date = ref()
const setDate = (newDate: string) => {
  date.value = dayjs(newDate).format('YYYY-MM-DD')
}
</script>
<template>
  <CInput :value="date" icon="ph-calendar-plus" @change="setDate"></CInput>
</template>
