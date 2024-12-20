export type Currency = "USD"

export interface Operation {
  amount: Number;
  currency: Currency;
  date: Date;
  description: String;
  tag: String;
//  source: String;
}

export interface PerDayInformation {
  transactions: number;
  balance: number;
  date: Date;
}
