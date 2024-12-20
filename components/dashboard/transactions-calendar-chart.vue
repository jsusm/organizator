<script setup lang="ts">
import { balancePerDay } from '~/mockData/operations';
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getLocalTimeZone, today, startOfMonth, getDayOfWeek, GregorianCalendar } from "@internationalized/date"
import type { PerDayInformation } from '~/types';

const daysOfWeek = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
]

const colors = [
  "bg-green-950",
  "bg-green-900",
  "bg-green-800",
  "bg-green-700",
  "bg-green-600",
]

type DayInfo = {
  colorClass: string;
  shortDateFormat: string;
  transactions: number;
}

function mapDayInformation(perDayInfo: PerDayInformation[]): DayInfo[] {
  // get minimum and maximum transactions
  let min = perDayInfo[0].transactions ?? 0
  min = perDayInfo.reduce((min, curr) => curr.transactions < min ? curr.transactions : min, min)
  let max = perDayInfo[0].transactions ?? 0
  max = perDayInfo.reduce((max, curr) => curr.transactions > max ? curr.transactions : max, max)

  const absolute = max - min

  // get color class for each day
  function getColor(transactions: number) {
    const b = (transactions - min) / absolute
    const colorIdx = Math.ceil((b * (colors.length - 1)))
    return colors[colorIdx]
  }

  // process day information
  const dayInformation: DayInfo[] = balancePerDay.map(
    (dayInfo) => {
      return {
        colorClass: getColor(dayInfo.transactions),
        shortDateFormat: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(dayInfo.date),
        transactions: dayInfo.transactions,
      }
    }
  )
  return dayInformation;
}

function getCalendarMetadata() {
  // process calendar metadata
  const date = today(getLocalTimeZone())
  const calendar = new GregorianCalendar()
  const firstDayOfMonth = startOfMonth(date)
  const startMonthOffset = getDayOfWeek(firstDayOfMonth, 'us-US');
  const daysInMonth = calendar.getDaysInMonth(date)

  return {
    length: daysInMonth,
    firstDayIdx: startMonthOffset,
  }
}

const calendarData = { ...getCalendarMetadata(), dayInfo: mapDayInformation(balancePerDay) }

</script>
<template>
  <div class="max-w-sm border border-stone-700 p-4 rounded-lg">
    <div class="pb-4 flex justify-between">
      <p class="text-stone-200">June 2024</p>
    </div>
    <div class="grid grid-cols-7 gap-2 pb-2">
      <p class="text-xs text-stone-600 justify-items-center" v-for="day in daysOfWeek">
        {{ day }}
      </p>
    </div>
    <div class="grid grid-cols-7 gap-2 justify-items-center">

      <div class="w-4 h-4 rounded bg-stone-800" v-for="_ in calendarData.firstDayIdx" />

      <TooltipProvider v-for="day in calendarData.dayInfo" :delay-duration="200" disable-hoverable-content>
        <Tooltip>
          <TooltipTrigger as-child>
            <div class="w-4 h-4 rounded" :class="[day.colorClass]" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ day.transactions }} transactions on {{ day.shortDateFormat }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider :delay-duration="200" disable-hoverable-content
        v-for="_ in calendarData.length - calendarData.dayInfo.length">
        <Tooltip>
          <TooltipTrigger as-child>
            <div class="w-4 h-4 rounded bg-stone-800" />
          </TooltipTrigger>
          <TooltipContent>
            <p>No Information</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>
