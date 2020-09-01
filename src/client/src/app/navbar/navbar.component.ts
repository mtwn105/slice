import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {}

  logout() {
    this.authService.userLoggedIn = false;
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
