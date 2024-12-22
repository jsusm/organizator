<script setup lang="ts">
import { categories } from '~/mockData/operations';
</script>
<template>
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
</template>
