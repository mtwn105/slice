import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { NwbAlertConfig, NwbAlertService } from "@wizishop/ng-wizi-bulma";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;

  loading: any;

  constructor(
    private authService: AuthService,
    private nwbAlert: NwbAlertService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    console.log(this.username, this.password);
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(
      (res: any) => {
        this.loading = false;
        const position = "is-top";
        const color = "is-success";
        const alertConfig: NwbAlertConfig = {
          message: "Logged In Successfully",
          duration: 2000,
          position,
          color,
        };

        this.nwbAlert.open(alertConfig);

        localStorage.setItem("isUserLoggedIn", "true");
        localStorage.setItem("username", res.username);
        localStorage.setItem("userId", res.userId);
        localStorage.setItem("name", res.name);
        localStorage.setItem("email", res.email);
        localStorage.setItem("token", res.token);
        this.authService.userLoggedIn = true;
        this.router.navigateByUrl("/dashboard");
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
