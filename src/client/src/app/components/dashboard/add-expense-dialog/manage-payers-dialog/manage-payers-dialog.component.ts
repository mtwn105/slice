import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-manage-payers-dialog",
  templateUrl: "./manage-payers-dialog.component.html",
  styleUrls: ["./manage-payers-dialog.component.scss"],
})
export class ManagePayersDialogComponent implements OnInit {
  @Input() inputPayers: any;
  @Input() amount: any;
  @Output() setPayers = new EventEmitter<any>();
  splitEqually = true;
  payers: any;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.payers = [...this.inputPayers];
  }

  performSplitEqually() {
    this.splitEqually = true;
    let payersLength = 0;
    this.payers.map((payer) => {
      if (payer.isPayer) {
        payersLength++;
      }
    });
    console.log(payersLength);
    this.payers.map((payer) => {
      if (payer.isPayer) {
        payer.amount = this.amount / payersLength;
      } else {
        payer.amount = 0;
      }
    });
  }
  performSplitUnequally() {
    this.splitEqually = false;
  }

  calculateTotal() {
    return this.payers.reduce(
      (t, payer) => (payer.isPayer ? (t += payer.amount) : (t += 0)),
      0
    );
  }

  saveSplit() {
    const total = this.calculateTotal();
    if (total == this.amount) {
      this.setPayers.emit(this.payers);
    } else {
      this.alertService.showMessage("Total is invalid", true);
    }
  }
}
