<script setup lang="ts">
import { ref } from 'vue'

import dayjs from 'dayjs'

import CInput from './CInput.vue'

const date = ref()
</script>
<template>
  <CInput v-model:value="date" icon="ph-calendar-plus"></CInput>
</template>
