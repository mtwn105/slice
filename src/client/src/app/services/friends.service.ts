import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class FriendsService {
  appUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getFriends(): any {
    return this.http.get(`${this.appUrl}/friends/${this.authService.userId}`);
  }

  addFriend(friendId): any {
    return this.http.post(
      `${this.appUrl}/friends/${this.authService.userId}/${friendId}`,
      {}
    );
  }

  removeFriend(friendId): any {
    return this.http.delete(
      `${this.appUrl}/friends/${this.authService.userId}/${friendId}`
    );
  }
}
