import { Split } from "./split";

export interface Expense {
  name: string;
  amount: number;
  groupId: string;
  category: string;
  members: string[];
  payers: Split[];
  split: Split[];
  expenseDate: Date;
}
