import { Component, OnInit } from "@angular/core";
import { BalanceService } from "../balance.service";
import { ExpenseService } from "../expense.service";
import { FriendsService } from "../friends.service";
import { NwbAlertService, NwbAlertConfig } from "@wizishop/ng-wizi-bulma";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  totalBalance = 0;
  expenses = [];
  friends = [];

  constructor(
    public router: Router,
    private nwbAlert: NwbAlertService,
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
}
