import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class BalanceService {
  appUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTotalBalance(): any {
    return this.http.get(
      `${this.appUrl}/balance/${localStorage.getItem("userId")}`
    );
  }

  getBalance(): any {
    return this.http.get(
      `${this.appUrl}/balance/${localStorage.getItem("userId")}`
    );
  }
}
