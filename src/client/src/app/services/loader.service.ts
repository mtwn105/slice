import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  isLoading = new BehaviorSubject(false);

  constructor() {}

  setLoading(value) {
    this.isLoading.next(value);
  }
}
