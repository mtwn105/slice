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

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, public nwbAlert: NwbAlertService) {}
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
        const position = "is-top";
        const color = "is-danger";
        const alertConfig: NwbAlertConfig = {
          message: `<b>${error.error.error}</b>`,
          duration: 2000,
          position,
          color,
        };

        this.nwbAlert.open(alertConfig);
        return throwError(errorMsg);
      })
    );
  }
}
