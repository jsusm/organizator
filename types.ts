//export type Currency = "USD";

export interface Operation {
  amount: number;
  date: Date;
  description: String | null;
  category: Category | null;
  //  source: String;
  // currency: Currency;
}

export interface PerDayInformation {
  transactions: number;
  balance: number;
  date: Date;
}

export interface Category {
  id: number;
  title: string;
  icon: string;
  color: string;
}
