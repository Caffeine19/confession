<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'

import { storeToRefs } from 'pinia'
import {
  Chart,
  Tooltip,
  BarElement,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  type ChartData
} from 'chart.js'
import { Bar, Line } from 'vue-chartjs'
import dayjs from 'dayjs'

import CDivider from '@/components/CDivider.vue'
import CChartContainer from '@/components/CChartContainer.vue'

import { useEntryStore } from '@/stores/entry'

Chart.register(Tooltip, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

const entryStore = useEntryStore()
const { groupedEntryListByDate } = storeToRefs(entryStore)

//helped by chatgpt,thanks
const dailyStatisticList = computed(() => {
  return groupedEntryListByDate.value.map((group) => {
    const input = group.entryList.reduce((acc, entry) => {
      if (entry.type === 'input') {
        return acc + entry.amount
      }
      return acc
    }, 0)
    const output = group.entryList.reduce((acc, entry) => {
      if (entry.type === 'output') {
        return acc + entry.amount
      }
      return acc
    }, 0)

    return {
      date: group.date,
      input,
      output
    }
  })
})

//helped by chatgpt,thanks
const barChartData: ComputedRef<ChartData<'bar'>> = computed(() => {
  const data: ChartData<'bar'> = {
    labels: dailyStatisticList.value.map((statistic) => dayjs(statistic.date).format('MM-DD')),
    datasets: [
      {
        data: dailyStatisticList.value.map((statistic) => statistic.input),
        backgroundColor: '#c5dcf8',
        barPercentage: 0.2,
        minBarLength: 5
      },
      {
        data: dailyStatisticList.value.map((statistic) => statistic.output),
        backgroundColor: '#ff7245',
        barPercentage: 0.2,
        minBarLength: 5
      }
    ]
  }
  return data
})

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        color: '#A3A3A3',
        beginAtZero: true,
        font: { size: 14 },
        maxTicksLimit: 6
      },
      grid: { display: false }
    },
    x: {
      ticks: {
        color: '#A3A3A3',
        beginAtZero: true,
        font: { size: 14 }
      },
      grid: { display: false }
    }
  }
}

const lineChartData: ComputedRef<ChartData<'line'>> = computed(() => {
  const data: ChartData<'line'> = {
    labels: dailyStatisticList.value.map((statistic) => dayjs(statistic.date).format('MM-DD')),
    datasets: [
      {
        data: dailyStatisticList.value.map((statistic) => statistic.input),
        borderColor: '#c5dcf8'
        // tension: 0.4
      },
      {
        data: dailyStatisticList.value.map((statistic) => statistic.output),
        borderColor: '#ff7245'
        // tension: 0.4
      }
    ]
  }
  return data
})

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: { color: '#A3A3A3', beginAtZero: true, font: { size: 14 }, maxTicksLimit: 6 },
      grid: { display: false }
    },
    x: {
      ticks: { color: '#A3A3A3', beginAtZero: true, font: { size: 14 } },
      grid: { display: false }
    }
  }
}
</script>
<template>
  <div class="flex flex-col p-6 space-y-6 grow overflow-y-auto custom-scrollbar">
    <CChartContainer title="Daily Income And Expense Statement" icon="ph-chart-bar-horizontal">
      <Bar id="my-chart-id" :options="barChartOptions" :data="barChartData" class="w-full" />
    </CChartContainer>
    <CDivider></CDivider>

    <CChartContainer title="Daily Income And Expense Statement" icon="ph-wave-sine">
      <Line id="my-chart-id" :options="lineChartOptions" :data="lineChartData" class="w-full" />
    </CChartContainer>
    <CDivider></CDivider>

    <CChartContainer title="Daily Income And Expense Statement" icon="ph-chart-pie">
    </CChartContainer>
  </div>
</template>
