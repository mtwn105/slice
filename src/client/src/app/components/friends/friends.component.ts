import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { FriendsService } from "src/app/services/friends.service";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.scss"],
})
export class FriendsComponent implements OnInit {
  users = [];
  filteredUsers = [];
  searchTerm;
  friends = [];

  constructor(
    private userService: UserService,
    private friendsService: FriendsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getFriends();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
      this.filteredUsers = res;
    });
  }

  getFriends() {
    this.friendsService.getFriends().subscribe((res) => {
      this.friends = res;
    });
  }

  filterUsers(event) {
    const search = event.target.value.toLowerCase();
    this.filteredUsers = this.users.filter(
      ({ username, name, email }) =>
        username.toLowerCase().includes(search) ||
        name.toLowerCase().includes(search) ||
        email.toLowerCase().includes(search)
    );
  }

  checkIfFriend(friendId) {
    return this.friends.find((friend) => friend.friendId == friendId) != null;
  }
}
