import { type Transaction } from "~/types";

export const useTransactions = () => {
  const transactions = ref<Transaction[]>([]);

  onMounted(() => {
    if (import.meta.client) {
      const transactionsData = localStorage.getItem("transactions");
      if (transactionsData === null) {
        return;
      }
      transactions.value = JSON.parse(transactionsData) as Transaction[];
    }
  });

  watch(
    transactions,
    () => {
      if (import.meta.client) {
        localStorage.setItem(
          "transactions",
          JSON.stringify(transactions.value),
        );
      }
    },
    { deep: true },
  );

  function createTransaction(payload: {
    amount: number;
    categoryTitle: string;
    desc: string;
  }) {
    transactions.value.push({
      id: Date.now(),
      amount: payload.amount,
      desc: payload.desc,
      category: { id: 1, title: payload.categoryTitle },
      date: "today",
    });
  }

  function deleteTransction(payload: { id: number }) {
    transactions.value = transactions.value.filter((t) => t.id != payload.id);
  }

  function getTransactionById(id: number): Transaction | undefined {
    console.log({id, transactions: transactions.value});
    return transactions.value.find(t => t.id === id)
  }

  function updateTransaction(payload: {
    id: number;
    amount?: number;
    categoryTitle?: string;
    desc?: string;
  }) {
    transactions.value = transactions.value.map((t) => t.id == payload.id ? {...t, ...payload} : t)
  }

  return { transactions, createTransaction, deleteTransction, getTransactionById, updateTransaction };
};
