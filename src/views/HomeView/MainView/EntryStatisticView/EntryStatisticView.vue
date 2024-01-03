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
  Filler,
  ArcElement,
  Legend,
  type ChartData,
  type ChartOptions
} from 'chart.js'
import { Bar, Line, Doughnut } from 'vue-chartjs'
import dayjs from 'dayjs'

import CDivider from '@/components/CDivider.vue'
import CChartContainer from '@/components/CChartContainer.vue'

import { useEntryStore } from '@/stores/entry'

import type { EntryWithCategory } from '@/types/entry'

import { getGradient } from '@/utils/getGradient'

Chart.register(
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  Legend
)

const entryStore = useEntryStore()
const { groupedEntryListByDate, entryList, incomeAndExpenseSummary } = storeToRefs(entryStore)

//helped by chatgpt,thanks
const statisticListGroupedByDate = computed(() => {
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
    labels: statisticListGroupedByDate.value.map((statistic) =>
      dayjs(statistic.date).format('MM-DD')
    ),
    datasets: [
      {
        data: statisticListGroupedByDate.value.map((statistic) => statistic.input),
        barPercentage: 0.5,
        minBarLength: 5,

        borderWidth: 2,
        borderColor: 'rgba(157, 198, 243, 1)',

        backgroundColor: (ctx) => {
          const chart = ctx.chart
          const { ctx: chartCtx, chartArea } = chart
          if (!chartArea) {
            // This case happens on initial chart load
            return
          }
          return getGradient({
            ctx: chartCtx,

            position: { x0: 0, x1: 0, y0: chartArea.top, y1: chartArea.bottom },
            colorStopOptions: [
              { offset: 0, color: 'rgba(157, 198, 243, 0.6)' },
              { offset: 1, color: 'rgba(157, 198, 243, 0.2)' }
            ]
          })
        }
      },
      {
        data: statisticListGroupedByDate.value.map((statistic) => statistic.output),
        barPercentage: 0.5,
        minBarLength: 5,

        borderWidth: 2,
        borderColor: 'rgba(255,114,69, 1)',

        backgroundColor: (ctx) => {
          const chart = ctx.chart
          const { ctx: chartCtx, chartArea } = chart
          if (!chartArea) {
            // This case happens on initial chart load
            return
          }
          return getGradient({
            ctx: chartCtx,

            position: { x0: 0, x1: 0, y0: chartArea.top, y1: chartArea.bottom },
            colorStopOptions: [
              {
                offset: 0,
                color: 'rgba(255, 114, 69, 0.6)'
              },
              {
                offset: 1,
                color: 'rgba(255, 114, 69, 0.2)'
              }
            ]
          })
        }
      }
    ]
  }
  return data
})

const barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        color: '#A3A3A3',
        font: { size: 14 },
        maxTicksLimit: 6
      },
      grid: { display: false }
    },
    x: {
      ticks: {
        color: '#A3A3A3',
        font: { size: 14 }
      },
      grid: { display: false }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

const lineChartData: ComputedRef<ChartData<'line'>> = computed(() => {
  const data: ChartData<'line'> = {
    labels: statisticListGroupedByDate.value.map((statistic) =>
      dayjs(statistic.date).format('MM-DD')
    ),
    datasets: [
      {
        data: statisticListGroupedByDate.value.map((statistic) => statistic.input),
        borderColor: '#c5dcf8',
        // tension: 0.4

        backgroundColor: (ctx) => {
          const chart = ctx.chart
          const { ctx: chartCtx, chartArea } = chart
          if (!chartArea) {
            // This case happens on initial chart load
            return
          }
          return getGradient({
            ctx: chartCtx,
            position: { x0: 0, x1: 0, y0: chartArea.top, y1: chartArea.bottom },
            colorStopOptions: [
              { offset: 0, color: 'rgba(157, 198, 243, 0.8)' },
              { offset: 0.4, color: 'rgba(157, 198, 243, 0.3)' },
              { offset: 1, color: 'rgba(157, 198, 243, 0)' }
            ]
          })
        },
        fill: true
      },

      {
        data: statisticListGroupedByDate.value.map((statistic) => statistic.output),
        borderColor: '#ff7245',

        backgroundColor: (ctx) => {
          const chart = ctx.chart
          const { ctx: chartCtx, chartArea } = chart
          if (!chartArea) {
            // This case happens on initial chart load
            return
          }
          return getGradient({
            ctx: chartCtx,
            position: { x0: 0, x1: 0, y0: chartArea.top, y1: chartArea.bottom },
            colorStopOptions: [
              {
                offset: 0,
                color: 'rgba(255, 114, 69, 0.8)'
              },
              {
                offset: 0.4,
                color: 'rgba(255, 114, 69, 0.3)'
              },
              { offset: 1, color: 'rgba(255, 114, 69, 0)' }
            ]
          })
        },
        fill: true
      }
    ]
  }
  return data
})

const lineChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: { color: '#A3A3A3', font: { size: 14 }, maxTicksLimit: 6 },
      grid: { display: false }
    },
    x: {
      ticks: { color: '#A3A3A3', font: { size: 14 } },
      grid: { display: false }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

const groupEntryListByCategory = (list: EntryWithCategory[]) => {
  return list.reduce(
    (acc, entry) => {
      const category = entry.category
      if (!category) {
        return acc
      }
      const index = acc.findIndex((statistic) => statistic.category?.id === category.id)
      if (index === -1) {
        acc.push({
          category,
          input: entry.type === 'input' ? entry.amount : 0,
          output: entry.type === 'output' ? entry.amount : 0
        })
      } else {
        if (entry.type === 'input') {
          acc[index].input += entry.amount
        } else {
          acc[index].output += entry.amount
        }
      }
      return acc
    },
    [] as { category: EntryWithCategory['category']; input: number; output: number }[]
  )
}

const pieChartData: ComputedRef<ChartData<'doughnut'>[]> = computed(() => {
  const input: ChartData<'doughnut'> = {
    labels: groupEntryListByCategory(entryList.value.filter((entry) => entry.type === 'input')).map(
      (statistic) => statistic.category?.label
    ),
    datasets: [
      {
        data: groupEntryListByCategory(
          entryList.value.filter((entry) => entry.type === 'input')
        ).map((statistic) => statistic.input),
        backgroundColor: [
          '#deeafb',
          '#c5dcf8',
          '#9dc6f3',
          '#6fa8eb',
          '#4d87e4',
          '#386bd8',
          '#2f57c6',
          '#2c48a1',
          '#283f80',
          '#1d284e'
        ],
        borderColor: 'transparent'
      }
      // {
      //   data: statisticListGroupedByCategory.value.map((statistic) => statistic.output),
      //   backgroundColor: '#ff7245'
      // }
    ]
  }
  const output: ChartData<'doughnut'> = {
    labels: groupEntryListByCategory(
      entryList.value.filter((entry) => entry.type === 'output')
    ).map((statistic) => statistic.category?.label),
    datasets: [
      {
        data: groupEntryListByCategory(
          entryList.value.filter((entry) => entry.type === 'output')
        ).map((statistic) => statistic.output),

        backgroundColor: [
          '#ffe4d4',
          '#ffc5a8',
          '#ff9c71',
          '#ff7245',
          '#fe4111',
          '#ef2707',
          '#c61708',
          '#9d150f',
          '#7e1510',
          '#440606'
        ],
        borderColor: 'transparent'
      }
      // {
      //   data: statisticListGroupedByCategory.value.map((statistic) => statistic.output),
      //   backgroundColor: '#ff7245'
      // }
    ]
  }
  return [input, output]
})

const pieChartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: 70,
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>
<template>
  <div class="flex flex-col p-6 space-y-6 grow overflow-y-auto custom-scrollbar">
    <CChartContainer
      title="Daily Income And Expense Statement"
      icon="ph-chart-bar-horizontal"
      chart-height="h-[16rem]"
    >
      <Bar id="my-chart-id" :options="barChartOptions" :data="barChartData" class="w-full" />
    </CChartContainer>
    <CDivider></CDivider>

    <CChartContainer
      title="Daily Income And Expense Statement"
      icon="ph-wave-sine"
      chart-height="h-[16rem]"
    >
      <Line id="my-chart-id" :options="lineChartOptions" :data="lineChartData" class="w-full" />
    </CChartContainer>
    <CDivider></CDivider>

    <CChartContainer
      title="Daily Income And Expense Statement"
      icon="ph-chart-pie"
      chart-height="h-[20rem]"
    >
      <div class="grid grid-cols-2 items-stretch h-full">
        <div class="flex items-center justify-center h-full px-36 relative">
          <Doughnut :options="pieChartOptions" :data="pieChartData[0]"></Doughnut>
          <p
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yokatta-200 text-xl font-bold"
          >
            +{{ (incomeAndExpenseSummary.income / 100).toLocaleString() }}
          </p>
        </div>
        <div class="flex items-center justify-center h-full px-36 relative">
          <Doughnut :options="pieChartOptions" :data="pieChartData[1]"></Doughnut>
          <p
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-guilty-400 text-xl font-bold"
          >
            -{{ (incomeAndExpenseSummary.expense / 100).toLocaleString() }}
          </p>
        </div>
      </div>
    </CChartContainer>
  </div>
</template>
