import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  appUrl = environment.apiUrl;
  userLoggedIn = localStorage.getItem("isUserLoggedIn") == "true";
  token = localStorage.getItem("token");
  userId = localStorage.getItem("userId");
  username = localStorage.getItem("username");
  name = localStorage.getItem("name");
  email = localStorage.getItem("email");

  constructor(private http: HttpClient) {}

  login(username, password): any {
    const loginUrl = `${this.appUrl}/auth/login`;
    return this.http.post(loginUrl, { username, password });
  }

  signup(user): any {
    const loginUrl = `${this.appUrl}/auth/signup`;
    return this.http.post(loginUrl, user);
  }

  logout() {
    this.userLoggedIn = false;
    this.token = null;
    this.username = null;
    this.name = null;
    this.email = null;
    this.userId = null;
  }
}
