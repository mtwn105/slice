import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  appUrl = environment.apiUrl;
  userLoggedIn = localStorage.getItem("isUserLoggedIn") == "true";

  constructor(private http: HttpClient) {}

  login(username, password) {
    const loginUrl = `${this.appUrl}/auth/login`;
    return this.http.post(loginUrl, { username, password });
  }

  signup(user) {
    const loginUrl = `${this.appUrl}/auth/signup`;
    return this.http.post(loginUrl, user);
  }
}
