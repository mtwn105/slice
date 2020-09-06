import { Component, OnInit } from "@angular/core";
import {
  NwbAlertService,
  NwbAlertConfig,
  NwbDialogConfig,
  NwbDialogService,
} from "@wizishop/ng-wizi-bulma";
import { Router } from "@angular/router";
import { AddExpenseDialogComponent } from "./add-expense-dialog/add-expense-dialog.component";
import { BalanceService } from "src/app/services/balance.service";
import { ExpenseService } from "src/app/services/expense.service";
import { FriendsService } from "src/app/services/friends.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  totalBalance = 0;
  expenses = [];
  friends = [];
  expenseDialogConfig: NwbDialogConfig = {
    title: "Add an Expense",
    hasBackdrop: true,
  };

  constructor(
    public router: Router,
    private nwbAlert: NwbAlertService,
    private nwbDialog: NwbDialogService,
    private balanceService: BalanceService,
    private expenseService: ExpenseService,
    private friendsService: FriendsService
  ) {}

  ngOnInit() {
    this.getTotalBalance();
    this.getExpenses();
    this.getFriends();
  }

  getTotalBalance() {
    this.balanceService.getTotalBalance().subscribe((res) => {
      this.totalBalance = res.balance;
    });
  }
  getExpenses() {
    this.expenseService.getExpenses().subscribe((res) => {
      this.expenses = res;
    });
  }
  getFriends() {
    this.friendsService.getFriends().subscribe((res) => {
      this.friends = res;
    });
  }

  addExpense() {
    const dialog = this.nwbDialog.openFromComponent(
      AddExpenseDialogComponent,
      this.expenseDialogConfig
    );

    dialog.componentInstance.friends = this.friends;

    dialog.afterClosed().subscribe((addExpense) => {
      if (addExpense) {
        const addExpenseFormValue = dialog.componentInstance.expense;
      }
    });
  }
}
