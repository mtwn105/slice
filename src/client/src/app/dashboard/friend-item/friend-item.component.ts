import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-friend-item",
  templateUrl: "./friend-item.component.html",
  styleUrls: ["./friend-item.component.scss"],
})
export class FriendItemComponent implements OnInit {
  @Input() friend;

  constructor() {}

  ngOnInit(): void {}
}
