<script setup lang="ts">
import { operations } from '~/mockData/operations';

type Category = {
  title: string;
  iconName: string;
  color: string;
}

const categories: Category[] = [
  {
    title: 'Food',
    iconName: 'carrot',
    color: 'orange',
  },
  {
    title: 'Health',
    iconName: 'activity',
    color: 'blue',
  },
  {
    title: 'Home',
    iconName: 'home',
    color: 'indigo',
  },
  {
    title: 'Education',
    iconName: 'book-2',
    color: 'green',
  },
]

</script>

<template>
  <div class="sm:container mx-auto py-16">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-7">
      <div class="md:col-span-4 space-y-4">
        <div class="grid lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between pb-2">
              <CardTitle class="text-sm font-medium">Balance</CardTitle>
              <Icon class="text-stone-500 w-5 h-5" name="tabler:currency-dollar" />
            </CardHeader>
            <CardContent>
              <p class="text-2xl font-bold">$1230.22</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between pb-2">
              <CardTitle class="text-sm font-medium">Income</CardTitle>
              <Icon class="text-green-500 w-5 h-5" name="tabler:trending-up" />
            </CardHeader>
            <CardContent>
              <p class="text-2xl font-bold">$1230.22</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between pb-2">
              <CardTitle class="text-sm font-medium">Outcome</CardTitle>
              <Icon class="text-rose-500 w-5 h-5" name="tabler:trending-down" />
            </CardHeader>
            <CardContent>
              <p class="text-2xl font-bold">$1230.22</p>
            </CardContent>
          </Card>
        </div>
        <div class="flex flex-col lg:flex-row gap-4">
          <DashboardTransactionsCalendarChart class="self-center"/>
          <Card class="border flex-1 rounded-lg">
            <CardHeader class="flex flex-row justify-between items-center">
              <CardTitle>Categories</CardTitle>
              <Button variant="secondary">Create Category</Button>
            </CardHeader>
            <CardContent class="flex">
              <div class="flex flex-wrap gap-2">
                <TooltipProvider>
                  <Tooltip v-for="category in categories">
                    <TooltipTrigger>
                      <DashboardCategory :iconName="category.iconName" :color="category.color" />
                    </TooltipTrigger>
                    <TooltipContent>
                      {{ category.title }}
                    </TooltipContent>
                  </Tooltip>

                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              Balance
            </CardTitle>
            <p class="text-sm text-stone-400">Track your balance over the last month</p>
          </CardHeader>
          <CardContent class="pl-2 pb-16">
            <DashboardBalanceChart />
          </CardContent>
        </Card>
      </div>
      <Card class="md:col-span-3">
        <CardHeader>
          <CardTitle>Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <Operations :operations="operations" />
        </CardContent>
      </Card>
    </div>

  </div>
</template>
