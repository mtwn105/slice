import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Expense } from "src/app/models/expense";
import { Constants } from "src/app/constants/constants";
import { AuthService } from "src/app/auth/auth.service";
import { NwbDialogConfig, NwbDialogService } from "@wizishop/ng-wizi-bulma";
import { FindUserDialogComponent } from "./find-user-dialog/find-user-dialog.component";
import { ExpenseService } from "src/app/services/expense.service";
import { ManagePayersDialogComponent } from "./manage-payers-dialog/manage-payers-dialog.component";
import { ManageSplitDialogComponent } from "./manage-split-dialog/manage-split-dialog.component";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-add-expense-dialog",
  templateUrl: "./add-expense-dialog.component.html",
  styleUrls: ["./add-expense-dialog.component.scss"],
})
export class AddExpenseDialogComponent implements OnInit {
  friends = [];

  members = [
    {
      id: this.authService.userId,
      name: this.authService.name,
    },
  ];
  splits = [];

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

  splitDialogConfig: NwbDialogConfig = {
    title: "Manager payers",
    hasBackdrop: true,
  };

  payers = [];

  @Output() addedExpense = new EventEmitter<any>();

  constructor(
    private expenseService: ExpenseService,
    public authService: AuthService,
    private nwbDialog: NwbDialogService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
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
    this.splits = [
      {
        name: this.authService.name,
        user: this.authService.userId,
        percentage: 100,
        amount: this.addExpenseForm.get("amount").value,
      },
    ];
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

  editSplit() {
    const dialog = this.nwbDialog.openFromComponent(
      ManageSplitDialogComponent,
      this.splitDialogConfig
    );

    if (
      this.payers.length == 1 &&
      this.payers[0].user == this.authService.userId
    ) {
      this.calculateSplits();
    }

    dialog.componentInstance.inputMembers = this.splits;
    dialog.componentInstance.amount = this.addExpenseForm.get("amount").value;

    dialog.componentInstance.setSplits.subscribe((res) => dialog.dismiss(true));

    dialog.afterClosed().subscribe((splits) => {
      if (splits) {
        this.splits = [];
        console.log("payers", dialog.componentInstance.splits);
        const newSplits = dialog.componentInstance.splits;
        newSplits.map(({ name, user, amount }) => {
          this.splits.push({
            name,
            user,
            amount,
            percentage:
              (amount / this.addExpenseForm.get("amount").value) * 100,
          });
        });
      }
    });
  }

  addExpense() {
    if (this.addExpenseForm.invalid) {
      this.addExpenseForm.controls.name.markAsDirty();
      this.addExpenseForm.controls.category.markAsDirty();
      this.addExpenseForm.controls.amount.markAsDirty();
      this.addExpenseForm.controls.expenseDate.markAsDirty();
      return;
    }

    const { name, amount, category, expenseDate } = this.addExpenseForm.value;

    this.expense = {
      name,
      amount,
      category,
      expenseDate,
      groupId: null,
      members: this.members,
      payers: this.payers.map((payer) => {
        return {
          user: payer.user,
          percentage: payer.percentage,
          name: payer.name,
        };
      }),
      split: this.splits.map((split) => {
        return {
          user: split.user,
          percentage: split.percentage,
          name: split.name,
        };
      }),
    };

    console.log(this.expense);

    this.expenseService.addExpense(this.expense).subscribe((addedExpense) => {
      this.alertService.showMessage("Expense Added Successfully", false);
      this.addedExpense.emit();
    });
  }

  calculateSplits() {
    const amount = this.addExpenseForm.get("amount").value;
    this.payers = [];
    this.splits = [];
    this.members.map((mem) => {
      this.payers.push({
        user: mem.id,
        name: mem.name,
        percentage: 100 / this.members.length,
        isPayer: true,
        amount: amount / this.members.length,
      });
      this.splits.push({
        user: mem.id,
        name: mem.name,
        percentage: 100 / this.members.length,
        amount: amount / this.members.length,
      });
    });
  }
}
