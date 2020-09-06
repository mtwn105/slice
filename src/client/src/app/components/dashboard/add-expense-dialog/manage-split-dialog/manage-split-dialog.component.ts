import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-manage-split-dialog",
  templateUrl: "./manage-split-dialog.component.html",
  styleUrls: ["./manage-split-dialog.component.scss"],
})
export class ManageSplitDialogComponent implements OnInit {
  @Input() inputMembers: any;
  @Input() amount: any;
  @Output() setSplits = new EventEmitter<any>();
  splitEqually = true;
  splits: any;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.splits = [...this.inputMembers];
  }

  performSplitEqually() {
    this.splitEqually = true;
    this.splits.map((payer) => {
      payer.amount = this.amount / this.splits.length;
    });
  }
  performSplitUnequally() {
    this.splitEqually = false;
  }

  calculateTotal() {
    return this.splits.reduce((t, split) => (t += split.amount), 0);
  }

  saveSplit() {
    const total = this.calculateTotal();
    if (total == this.amount) {
      this.setSplits.emit(this.splits);
    } else {
      this.alertService.showMessage("Total is invalid", true);
    }
  }
}
