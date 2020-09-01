import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { NwbAlertService, NwbAlertConfig } from "@wizishop/ng-wizi-bulma";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading: any;
  formSubmitted: boolean;

  constructor(
    private authService: AuthService,
    private nwbAlert: NwbAlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  signup() {
    this.formSubmitted = true;
    console.log(this.signupForm.value);
    if (this.signupForm.invalid) {
      return;
    }
    if (
      this.signupForm.value.password != this.signupForm.value.confirmPassword
    ) {
      const position = "is-top";
      const color = "is-danger";
      const alertConfig: NwbAlertConfig = {
        message: `<b>Passwords must match</b>`,
        duration: 2000,
        position,
        color,
      };
      this.nwbAlert.open(alertConfig);
      return;
    }
    this.loading = true;
    this.authService.signup(this.signupForm.value).subscribe(
      (res: any) => {
        this.loading = false;
        const position = "is-top";
        const color = "is-success";
        const alertConfig: NwbAlertConfig = {
          message: "Signed Up In Successfully",
          duration: 2000,
          position,
          color,
        };

        this.nwbAlert.open(alertConfig);
        this.router.navigateByUrl("/login");
      },
      (err) => {
        this.loading = false;
        const position = "is-top";
        const color = "is-danger";
        const alertConfig: NwbAlertConfig = {
          message: `<b>${err.error.error}</b>`,
          duration: 2000,
          position,
          color,
        };

        this.nwbAlert.open(alertConfig);
      }
    );
  }
}
