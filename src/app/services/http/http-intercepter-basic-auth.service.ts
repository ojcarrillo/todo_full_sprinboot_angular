import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(private auth: BasicAuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // const username = 'demo';
    // const password = '123';
    // const headerString = 'Basic ' + window.btoa(username + ':' + password);

    const headerString = this.auth.getAuthenticateToken();
    const username = this.auth.getAuthenticateUser();

    if (username && headerString) {
      req = req.clone({
        setHeaders: {
          Authorization: headerString
        }
      });
    }
    return next.handle(req);
  }
}
