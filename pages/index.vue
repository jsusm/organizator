<script setup lang="ts">
import TableCell from "~/components/ui/table/TableCell.vue";

const { transactions } = useTransactions();
</script>

<template>
  <main class="mx-auto container max-w-screen-lg">
    <div class="mt-24 flex justify-between">
      <div>
        <h1 class="text-2xl leading-tight font-medium">Transactions</h1>
      </div>
      <div>
        <Button as-child>
          <NuxtLink to="create-transaction"> Create Transaction </NuxtLink>
        </Button>
      </div>
    </div>
    <div class="flex justify-center mt-12">
      <div class="max-w-4xl flex-1 border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Description </TableHead>
              <TableHead> Date </TableHead>
              <TableHead> Category </TableHead>
              <TableHead> Amount </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-if="!transactions.length">
              <TableCell colspan="4" class="text-center">
                There is no transactions,
                <NuxtLink
                  to="/create-transaction"
                  class="hover:underline inline-flex items-center"
                  >create one!
                  <Icon name="tabler:arrow-up-right" class="w-4 h-4 mb-0.5"
                /></NuxtLink>
              </TableCell>
            </TableRow>
            <TableRow v-for="transaction in transactions">
              <TableCell>
                {{ transaction.desc }}
              </TableCell>
              <TableCell>
                {{ transaction.date }}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {{ transaction.category.title }}
                </Badge>
              </TableCell>
              <TableCell>
                {{ transaction.amount }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </main>
</template>
