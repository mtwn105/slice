import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Expense } from "src/app/models/expense";
import { Constants } from "src/app/constants/constants";
import { AuthService } from "src/app/auth/auth.service";
import { NwbDialogConfig, NwbDialogService } from "@wizishop/ng-wizi-bulma";
import { FindUserDialogComponent } from "./find-user-dialog/find-user-dialog.component";
import { ExpenseService } from "src/app/services/expense.service";
import { ManagePayersDialogComponent } from "./manage-payers-dialog/manage-payers-dialog.component";

@Component({
  selector: "app-add-expense-dialog",
  templateUrl: "./add-expense-dialog.component.html",
  styleUrls: ["./add-expense-dialog.component.scss"],
})
export class AddExpenseDialogComponent implements OnInit {
  friends = [];

  members = [
    {
      name: this.authService.name,
      id: this.authService.userId,
    },
  ];
  split = [];

  expense: Expense;
  addExpenseForm: FormGroup;
  loading;
  categories = Constants.categories;

  memberDialogConfig: NwbDialogConfig = {
    title: "Find an user",
    hasBackdrop: true,
  };

  payersDialogConfig: NwbDialogConfig = {
    title: "Manager payers",
    hasBackdrop: true,
  };

  payers = [];

  constructor(
    private expenseService: ExpenseService,
    public authService: AuthService,
    private nwbDialog: NwbDialogService
  ) {}

  ngOnInit(): void {
    this.expense = {
      name: null,
      groupId: null,
      amount: 1,
      members: this.members.map((member) => member.id),
      category: null,
      payers: this.payers,
      split: this.split,
      expenseDate: new Date(),
    };
    this.addExpenseForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(1, [Validators.required, Validators.min(1)]),
      category: new FormControl("Bills", [Validators.required]),
      expenseDate: new FormControl(new Date().toISOString(), [
        Validators.required,
      ]),
    });
    this.payers = [
      {
        name: this.authService.name,
        user: this.authService.userId,
        percentage: 100,
        isPayer: true,
        amount: this.addExpenseForm.get("amount").value,
      },
    ];
  }

  addExpense() {
    console.log(this.addExpenseForm.value);
  }

  addMember() {
    const dialog = this.nwbDialog.openFromComponent(
      FindUserDialogComponent,
      this.memberDialogConfig
    );

    dialog.componentInstance.friends = this.friends.filter(
      (friend) =>
        friend.friendId !=
        this.members.find((member) => member.id == friend.friendId)?.id
    );

    dialog.componentInstance.getUser.subscribe((res) => dialog.dismiss(true));

    dialog.afterClosed().subscribe((addUser) => {
      if (addUser) {
        console.log("added user", dialog.componentInstance.selectedUser);
        const { name, friendId: id } = dialog.componentInstance.selectedUser;
        this.members.push({
          name,
          id,
        });
        this.calculateSplits();
      }
    });
  }

  removeMember(member) {
    this.members = this.members.filter((m) => m != member);
    this.calculateSplits();
  }

  editPayers() {
    const dialog = this.nwbDialog.openFromComponent(
      ManagePayersDialogComponent,
      this.payersDialogConfig
    );

    if (
      this.payers.length == 1 &&
      this.payers[0].user == this.authService.userId
    ) {
      this.calculateSplits();
    }

    dialog.componentInstance.inputPayers = this.payers;
    dialog.componentInstance.amount = this.addExpenseForm.get("amount").value;

    dialog.componentInstance.setPayers.subscribe((res) => dialog.dismiss(true));

    dialog.afterClosed().subscribe((payers) => {
      if (payers) {
        this.payers = [];
        console.log("payers", dialog.componentInstance.payers);
        const newPayers = dialog.componentInstance.payers;
        newPayers.map(({ name, user, isPayer, amount, percentage }) => {
          this.payers.push({
            name,
            user,
            amount,
            percentage:
              (amount / this.addExpenseForm.get("amount").value) * 100,
            isPayer,
          });
        });
      }
    });
  }

  calculateSplits() {
    const amount = this.addExpenseForm.get("amount").value;
    this.payers = [];
    this.members.map((mem) => {
      this.payers.push({
        user: mem.id,
        name: mem.name,
        percentage: 100 / this.members.length,
        isPayer: true,
        amount: amount / this.members.length,
      });
    });
  }
}
