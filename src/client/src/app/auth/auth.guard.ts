import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("isUserLoggedIn") == "true") {
      this.authService.userLoggedIn = true;
      this.authService.token = localStorage.getItem("token");
      this.authService.username = localStorage.getItem("username");
      this.authService.name = localStorage.getItem("name");
      this.authService.email = localStorage.getItem("email");
      this.authService.userId = localStorage.getItem("userId");
      return true;
    } else {
      this.router.navigateByUrl("/login");
      this.authService.userLoggedIn = false;
      this.authService.token = null;
      this.authService.username = null;
      this.authService.name = null;
      this.authService.email = null;
      this.authService.userId = null;
      return false;
    }
  }
}
