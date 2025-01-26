<script setup lang="ts">
import TableCell from "~/components/ui/table/TableCell.vue";

const transactions = [
  {
    id: 0,
    date: "January 1",
    desc: "hamburger",
    amount: -5.2,
    category: {
      id: 1,
      title: "food",
    },
  },
  {
    id: 1,
    desc: "pizza",
    date: "January 1",
    amount: -10.5,
    category: {
      id: 1,
      title: "food",
    },
  },
  {
    id: 2,
    desc: "salary",
    date: "January 2",
    amount: 2500,
    category: {
      id: 2,
      title: "income",
    },
  },
  {
    id: 3,
    desc: "rent",
    date: "January 2",
    amount: -800,
    category: {
      id: 3,
      title: "housing",
    },
  },
  {
    id: 4,
    date: "January 4",
    desc: "movie ticket",
    amount: -12.75,
    category: {
      id: 4,
      title: "entertainment",
    },
  },
  {
    id: 5,
    date: "January 4",
    desc: "gas",
    amount: -50.0,
    category: {
      id: 5,
      title: "transportation",
    },
  },
  {
    id: 6,
    desc: "groceries",
    date: "January 4",
    amount: -150.0,
    category: {
      id: 1,
      title: "food",
    },
  },
  {
    id: 7,
    desc: "internet bill",
    date: "January 4",
    amount: -75.0,
    category: {
      id: 6,
      title: "utilities",
    },
  },
];
</script>

<template>
  <main class="mx-auto container max-w-screen-lg">
    <div class="mt-24 space-y-4">
      <div>
        <h1 class="text-2xl leading-tight font-medium">Transactions</h1>
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
