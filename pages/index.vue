<script setup lang="ts">
</script>
<template>
  <div class="mx-auto grid grid-cols-5 gap-8 py-32">
    <div></div>
    <DashboardBalanceCard :amount="2100.00" currency>
        <p class="text-stone-200 pl-2" >Monthly income</p>
        <Icon class="text-green-400 w-6 h-6" name="tabler:trending-up"/>
    </DashboardBalanceCard>
    <DashboardBalanceCard :amount="2100.00" currency>
        <p class="text-stone-200 pl-2" >Monthly outcome</p>
        <Icon class="text-rose-600 w-6 h-6" name="tabler:trending-down"/>
    </DashboardBalanceCard>
  </div>
</template>
