<script setup lang="ts">
import { operations } from '~/mockData/operations';
import { format } from 'date-fns'
import type { Operation } from '~/types';

function groupByDay(oprs: Operation[]){
  const gruped: Record<string, Operation[]> = {}
  for(const i of oprs) {
    const key = format(i.date, "MMM d")
    if(!gruped[key]) {
      gruped[key] = []
    }
    gruped[key].push(i)
  }
  return gruped
}

const oprts = groupByDay(operations)

</script>
<template>
  <!-- Operations table -->
  <div class="mx-auto max-w-md">
    <div>
      <p class="ml-4 text-xl font-medium text-stone-200">Operations</p>
      <div v-for="operations, day in oprts">
        <p class="text-sm text-center text-stone-600">{{day}}</p>
        <ul class="space-y-2 py-2 pb-4">
          <li v-for="operation in operations">
            <div class="flex justify-between align-center border border-stone-800 px-4 py-2 rounded-lg">
              <div>
                <p class="text-stone-300">{{ operation.tag }}</p>
                <p class="text-sm text-stone-500">{{ operation.description }}</p>
              </div>
              <div class="">
                <p class="text-red-400 font-medium text-right">{{ operation.amount.toFixed(2) }}</p>
                <p class="text-sm text-stone-500 text-right">{{ format(operation.date, "MMM d") }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
