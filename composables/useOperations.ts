import type { CreateOperationSchema } from "~/schemas/operations";
import type { Operation } from "~/types";

export async function useOperations() {
  const operations = await useAsyncData(async (): Promise<Operation[]> => {
    const operations = await $fetch("/api/operations");
    return operations.map((operation) => ({
      ...operation,
      date: new Date(operation.date),
    }));
  });

  function createOperation(values: CreateOperationSchema) {
    return $fetch("/api/operations", {
      method: "post",
      body: values,
    }).then(() => {
      operations.refresh();
    });
  }

  return { operations, createOperation };
}
