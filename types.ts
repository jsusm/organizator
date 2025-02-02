export interface Category {
  id: number;
  title: string;
}
export interface Transaction {
  id: number;
  amount: number,
  desc: string,
  category: Category,
  date: string,
}
