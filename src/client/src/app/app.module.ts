import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NwbAllModule } from "@wizishop/ng-wizi-bulma";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BalanceService } from "./balance.service";
import { ExpenseService } from "./expense.service";
import { FriendsService } from "./friends.service";
import { HttpRequestInterceptor } from "./http.interceptor";
import { ExpenseItemComponent } from "./dashboard/expense-item/expense-item.component";
import { FriendItemComponent } from "./dashboard/friend-item/friend-item.component";
import { AvatarModule } from "ngx-avatar";
import { FriendsComponent } from './friends/friends.component';
import { UserItemComponent } from './friends/user-item/user-item.component';

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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
