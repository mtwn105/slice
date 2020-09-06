import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  appUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getExpenses(): any {
    return this.http.get(
      `${this.appUrl}/expense/${localStorage.getItem("userId")}`
    );
  }
}
