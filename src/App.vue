<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useProvideMessenger } from '@/hooks/useMessenger'

import CMessenger from './components/CMessenger.vue'

useProvideMessenger()
</script>

<template>
  <RouterView />
  <CMessenger></CMessenger>
</template>
