export interface Category {
  id: number;
  title: string;
}
export interface Transaction {
  amount: number,
  desc: string,
  category: Category,
  date: string,
}
