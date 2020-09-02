import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { AuthService } from "./auth/auth.service";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  NwbAlertComponent,
  NwbAlertService,
  NwbAlertConfig,
} from "@wizishop/ng-wizi-bulma";
import { AlertService } from "./alert.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, public alertService: AlertService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.userLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = error.error.error;
        this.alertService.showMessage(errorMsg, true);
        return throwError(errorMsg);
      })
    );
  }
}
