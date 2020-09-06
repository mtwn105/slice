import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-find-user-dialog",
  templateUrl: "./find-user-dialog.component.html",
  styleUrls: ["./find-user-dialog.component.scss"],
})
export class FindUserDialogComponent implements OnInit {
  @Input() friends: any;
  @Output() getUser = new EventEmitter<any>();
  filteredUsers: any;
  searchTerm;
  selectedUser;
  constructor() {}

  ngOnInit(): void {
    this.filteredUsers = this.friends;
  }

  filterUsers(event) {
    const search = event.target.value.toLowerCase();
    this.filteredUsers = this.friends.filter(
      ({ username, name, email }) =>
        username.toLowerCase().includes(search) ||
        name.toLowerCase().includes(search) ||
        email.toLowerCase().includes(search)
    );
  }

  selectUser(user) {
    console.log("SELECTED USER", user);
    this.selectedUser = user;
    this.getUser.emit(user);
  }
}
