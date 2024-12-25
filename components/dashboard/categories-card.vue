<script setup lang="ts">
const categories = await useCategories();
</script>
<template>
  <Card class="border flex-1 rounded-lg">
    <CardHeader class="flex flex-row justify-between items-center">
      <CardTitle>Categories</CardTitle>
      <Button variant="secondary" as-child>
        <NuxtLink to="/create-category"> Create Category </NuxtLink>
      </Button>
    </CardHeader>
    <CardContent class="flex">
      <Icon
        name="tabler:loader-2"
        class="m-auto animate-spin"
        v-if="categories.status.value == 'pending'"
      />
      <div
        class="flex flex-wrap gap-2"
        v-if="categories.status.value == 'success'"
      >
        <TooltipProvider>
          <Tooltip v-for="category in categories.data.value">
            <TooltipTrigger>
              <DashboardCategory
                :iconName="category.icon"
                :color="category.color"
              />
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
