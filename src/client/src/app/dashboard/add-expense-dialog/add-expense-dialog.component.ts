import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ExpenseService } from "src/app/expense.service";
import { Expense } from "src/app/models/expense";
import { Constants } from "src/app/constants/constants";

@Component({
  selector: "app-add-expense-dialog",
  templateUrl: "./add-expense-dialog.component.html",
  styleUrls: ["./add-expense-dialog.component.scss"],
})
export class AddExpenseDialogComponent implements OnInit {
  members = [localStorage.getItem("userId")];
  payers = [];
  split = [];

  expense: Expense;
  addExpenseForm: FormGroup;
  loading;
  categories = Constants.categories;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expense = {
      name: null,
      groupId: null,
      amount: 0,
      members: this.members,
      category: null,
      payers: this.payers,
      split: this.split,
      expenseDate: new Date(),
    };
    this.addExpenseForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl("Bills", [Validators.required]),
      expenseDate: new FormControl(new Date(), [Validators.required]),
    });
  }

  addExpense() {
    console.log(this.addExpenseForm.value);
  }
}
