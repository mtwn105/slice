import { Split } from "./split";
import { Member } from "./member";

export interface Expense {
  name: string;
  amount: number;
  groupId: string;
  category: string;
  members: Member[];
  payers: Split[];
  split: Split[];
  expenseDate: Date;
}
