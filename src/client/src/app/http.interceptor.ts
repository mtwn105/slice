import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { AuthService } from "./auth/auth.service";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  NwbAlertComponent,
  NwbAlertService,
  NwbAlertConfig,
} from "@wizishop/ng-wizi-bulma";
import { AlertService } from "./alert.service";
import { Router } from "@angular/router";
import { LoaderService } from "./loader.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService,
    public alertService: AlertService,
    private router: Router,
    private loaderService: LoaderService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.setLoading(true);
    if (this.auth.userLoggedIn) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.loaderService.setLoading(false);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.setLoading(false);
        if (error.status == 403) {
          this.router.navigateByUrl("/login");
          this.auth.userLoggedIn = false;
          this.auth.token = null;
          this.auth.username = null;
          this.auth.name = null;
          this.auth.email = null;
          this.auth.userId = null;
          this.alertService.showMessage(
            "Your session has expired. Please login again.",
            true
          );
          return throwError("Your session has expired. Please login again.");
        }
        const errorMsg = error.error.error;
        this.alertService.showMessage(errorMsg, true);
        return throwError(errorMsg);
      })
    );
  }
}
