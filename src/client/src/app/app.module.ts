import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { NwbAllModule } from "@wizishop/ng-wizi-bulma";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpRequestInterceptor } from "./http.interceptor";
import { AvatarModule } from "ngx-avatar";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ExpenseItemComponent } from "./components/dashboard/expense-item/expense-item.component";
import { FriendItemComponent } from "./components/dashboard/friend-item/friend-item.component";
import { FriendsComponent } from "./components/friends/friends.component";
import { UserItemComponent } from "./components/friends/user-item/user-item.component";
import { AddExpenseDialogComponent } from "./components/dashboard/add-expense-dialog/add-expense-dialog.component";
import { FindUserDialogComponent } from "./components/dashboard/add-expense-dialog/find-user-dialog/find-user-dialog.component";
import { BalanceService } from "./services/balance.service";
import { ExpenseService } from "./services/expense.service";
import { FriendsService } from "./services/friends.service";
import { LoaderService } from "./services/loader.service";
import { LoaderComponent } from './components/loader/loader.component';
import { ManagePayersDialogComponent } from './components/dashboard/add-expense-dialog/manage-payers-dialog/manage-payers-dialog.component';
import { ManageSplitDialogComponent } from './components/dashboard/add-expense-dialog/manage-split-dialog/manage-split-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    DashboardComponent,
    ExpenseItemComponent,
    FriendItemComponent,
    FriendsComponent,
    UserItemComponent,
    AddExpenseDialogComponent,
    FindUserDialogComponent,
    LoaderComponent,
    ManagePayersDialogComponent,
    ManageSplitDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NwbAllModule,
    AvatarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    AuthService,
    AuthGuard,
    BalanceService,
    ExpenseService,
    FriendsService,
    LoaderService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddExpenseDialogComponent],
})
export class AppModule {}
