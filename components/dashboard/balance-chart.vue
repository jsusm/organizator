<script setup lang="ts">
import { balancePerDay } from '~/mockData/operations';

const chartData = balancePerDay.map((info) => ({ balance: info.balance, date: new Intl.DateTimeFormat("en-US", { month: 'short', day: "numeric" }).format(info.date) }))

const xFormatter = (tick: number | Date, i: number, ticks: number[] | Date[]) => {
  return `\$${chartData[i].balance}`
}

</script>
<template>
  <AreaChart class="h-48 w-96" :data="chartData" index="date" :y-formatter="xFormatter" :categories="['balance']"
    :colors="['#fbbf24']" />
</template>
