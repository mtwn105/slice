import { Injectable } from "@angular/core";
import { NwbAlertService, NwbAlertConfig } from "@wizishop/ng-wizi-bulma";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(private nwbAlert: NwbAlertService) {}

  showMessage(message, isError) {
    const position = "is-top";
    const color = isError ? "is-danger" : "is-success";
    const alertConfig: NwbAlertConfig = {
      message: `<b>${message}</b>`,
      duration: 2000,
      position,
      color,
    };

    this.nwbAlert.open(alertConfig);
  }
}
