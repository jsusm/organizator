import { type Transaction } from "~/types";

export const useTransactions = () => {
  const transactions = useState<Transaction[]>("transactions", () => []);

  // persistance
  onMounted(() => {
    const transactionsData = localStorage.getItem("transactions");
    if (transactionsData === null) {
      return;
    }
    transactions.value = JSON.parse(transactionsData);
  });

  watchEffect(() => {
    console.log("transaction changed")
    localStorage.setItem("transactions", JSON.stringify(transactions.value));
  });

  function createTransaction(payload: {
    amount: number;
    categoryTitle: string;
    desc: string;
  }) {
    transactions.value.push({
      amount: payload.amount,
      desc: payload.desc,
      category: { id: 1, title: payload.categoryTitle },
      date: "today",
    });
  }

  return { transactions, createTransaction };
};
