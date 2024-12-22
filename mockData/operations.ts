import type { Category, Operation, PerDayInformation } from "~/types";

export const categories: Category[] = [
  {
    title: "Food",
    iconName: "carrot",
    color: "orange",
  },
  {
    title: "Health",
    iconName: "activity",
    color: "blue",
  },
  {
    title: "Home",
    iconName: "home",
    color: "indigo",
  },
  {
    title: "Education",
    iconName: "book-2",
    color: "green",
  },
];

export const balancePerDay: PerDayInformation[] = [
  {
    transactions: 4,
    balance: 1203,
    date: new Date("2024-12-01T03:24:00"),
  },
  {
    transactions: 2,
    balance: 1180,
    date: new Date("2024-12-02T03:24:00"),
  },
  {
    transactions: 8,
    balance: 1023,
    date: new Date("2024-12-03T03:24:00"),
  },
  {
    transactions: 0,
    balance: 1023,
    date: new Date("2024-12-04T03:24:00"),
  },
  {
    transactions: 6,
    balance: 982,
    date: new Date("2024-12-05T03:24:00"),
  },
  {
    transactions: 10,
    balance: 929,
    date: new Date("2024-12-06T03:24:00"),
  },
  {
    transactions: 2,
    balance: 910,
    date: new Date("2024-12-07T03:24:00"),
  },
  {
    transactions: 4,
    balance: 872,
    date: new Date("2024-12-08T03:24:00"),
  },
  {
    transactions: 1,
    balance: 860,
    date: new Date("2024-12-09T03:24:00"),
  },
  {
    transactions: 3,
    balance: 850,
    date: new Date("2024-12-10T03:24:00"),
  },
  {
    transactions: 10,
    balance: 810,
    date: new Date("2024-12-11T03:24:00"),
  },
];

export const operations: Operation[] = [
  {
    amount: -30.2,
    currency: "USD",
    date: new Date("2024-12-14"),
    description: "Lunch",
    tag: "Food",
  },
  {
    amount: -100.4,
    currency: "USD",
    date: new Date("2024-12-14"),
    description: "Shirt",
    tag: "Clothes",
  },
  {
    amount: -3.2,
    currency: "USD",
    date: new Date("2024-12-14"),
    description: "Snack",
    tag: "Food",
  },
  {
    amount: -33.22,
    currency: "USD",
    date: new Date("2024-12-13"),
    description: "Face cream",
    tag: "Health",
  },
  {
    amount: -70.0,
    currency: "USD",
    date: new Date("2024-12-13"),
    description: "",
    tag: "Gas",
  },
  {
    amount: -10.0,
    currency: "USD",
    date: new Date("2024-12-12"),
    description: "A Hamburger",
    tag: "Food",
  },
];
