import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AlertService } from "src/app/services/alert.service";
import { Router } from "@angular/router";

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
    private alertService: AlertService,
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
    if (this.signupForm.invalid) {
      return;
    }
    if (
      this.signupForm.value.password != this.signupForm.value.confirmPassword
    ) {
      this.alertService.showMessage("Passwords must match", true);
      return;
    }
    this.loading = true;
    this.authService.signup(this.signupForm.value).subscribe(
      (res: any) => {
        this.loading = false;
        this.alertService.showMessage("Signed Up In Successfully", false);

        this.router.navigateByUrl("/login");
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
