import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ExpenseService } from "src/app/expense.service";
import { Expense } from "src/app/models/expense";
import { Constants } from "src/app/constants/constants";
import { AuthService } from "src/app/auth/auth.service";
import { NwbDialogConfig, NwbDialogService } from "@wizishop/ng-wizi-bulma";
import { FindUserDialogComponent } from "./find-user-dialog/find-user-dialog.component";

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
  payers = [];
  split = [];

  expense: Expense;
  addExpenseForm: FormGroup;
  loading;
  categories = Constants.categories;

  memberDialogConfig: NwbDialogConfig = {
    title: "Find an user",
    hasBackdrop: true,
  };

  constructor(
    private expenseService: ExpenseService,
    public authService: AuthService,
    private nwbDialog: NwbDialogService
  ) {}

  ngOnInit(): void {
    this.expense = {
      name: null,
      groupId: null,
      amount: 0,
      members: this.members.map((member) => member.id),
      category: null,
      payers: this.payers,
      split: this.split,
      expenseDate: new Date(),
    };
    this.addExpenseForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl("Bills", [Validators.required]),
      expenseDate: new FormControl(new Date().toISOString(), [
        Validators.required,
      ]),
    });
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
        // const addExpenseFormValue = dialog.componentInstance.expense;
        console.log("added user", dialog.componentInstance.selectedUser);
        const { name, friendId: id } = dialog.componentInstance.selectedUser;
        this.members.push({
          name,
          id,
        });
      }
    });
  }

  removeMember(member) {
    this.members = this.members.filter((m) => m != member);
  }
}
