<script setup lang="ts">
import { toast } from "vue-sonner";
import AlertDialog from "~/components/ui/alert-dialog/AlertDialog.vue";
import TableCell from "~/components/ui/table/TableCell.vue";

const { transactions, deleteTransction } = useTransactions();
const transactionToDelete = reactive<{
  dialogOpen: boolean;
  transactionId: number | null;
}>({
  dialogOpen: false,
  transactionId: null,
});

function openDeleteDialog(id: number) {
  transactionToDelete.transactionId = id;
  transactionToDelete.dialogOpen = true;
}

function onConfirmDeleteTransction() {
  if(transactionToDelete.transactionId == null) return;
  deleteTransction({id: transactionToDelete.transactionId});
  toast("Transaction Deleted")
}
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
              <TableHead class="w-12"></TableHead>
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
              <TableCell class="w-12">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon"
                      ><Icon name="tabler:dots"
                    /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Update</DropdownMenuItem>
                    <DropdownMenuItem
                      @click="openDeleteDialog(transaction.id)"
                      variant="danger"
                      >Delete</DropdownMenuItem
                    >
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <AlertDialog
      :open="transactionToDelete.dialogOpen"
      @update:open="(v: boolean) => (transactionToDelete.dialogOpen = v)"
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Delete Transaction </AlertDialogTitle>
          <AlertDialogDescription>
            This transaction will be remove permanently.</AlertDialogDescription
          >
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="onConfirmDeleteTransction">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </main>
</template>
