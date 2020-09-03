import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FriendsService } from "src/app/friends.service";
import { AlertService } from "src/app/alert.service";
import { NwbDialogConfig, NwbDialogService } from "@wizishop/ng-wizi-bulma";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-item",
  templateUrl: "./user-item.component.html",
  styleUrls: ["./user-item.component.scss"],
})
export class UserItemComponent implements OnInit {
  @Input() user;
  @Input() isFriend;
  @Input() showAddUserButton;
  @Input() showAddFriendButton;
  @Output() selectUser = new EventEmitter<any>();

  addFriendDialogConfig: NwbDialogConfig = {
    title: "Add Friend",
    message: "Are you sure?",
    okButtonText: "Yes",
    cancelButtonText: "No",
  };

  removeFriendDialogConfig: NwbDialogConfig = {
    title: "Remove Friend",
    message: "Are you sure?",
    okButtonText: "Yes",
    cancelButtonText: "No",
  };

  constructor(
    private router: Router,
    private friendsService: FriendsService,
    private alertService: AlertService,
    private nwbDialog: NwbDialogService
  ) {}

  ngOnInit(): void {}

  addFriend() {
    const dialog = this.nwbDialog.open(this.addFriendDialogConfig);
    dialog.afterClosed().subscribe((fromOkButton) =>
      this.friendsService.addFriend(this.user._id).subscribe((res) => {
        this.alertService.showMessage("Friend Added Successfully", false);
        this.router.navigateByUrl("/dashboard");
      })
    );
  }

  removeFriend() {
    const dialog = this.nwbDialog.open(this.removeFriendDialogConfig);
    dialog.afterClosed().subscribe((fromOkButton) =>
      this.friendsService.removeFriend(this.user._id).subscribe((res) => {
        this.alertService.showMessage("Friend Removed Successfully", false);
        this.router.navigateByUrl("/dashboard");
      })
    );
  }

  addUser() {
    this.selectUser.emit(this.user);
  }
}
