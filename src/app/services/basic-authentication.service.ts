import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';


export const AUTHENTICATION_USER = 'usuario';
export const TOKEN = 'token';


@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  isUserLoggedIn() {
    // tslint:disable-next-line:prefer-const
    let user = sessionStorage.getItem(AUTHENTICATION_USER);
    return !(user === null);
  }

  getAuthenticateUser() {
    return sessionStorage.getItem(AUTHENTICATION_USER);
  }

  getAuthenticateToken() {
    if (sessionStorage.getItem(AUTHENTICATION_USER)) {
      return sessionStorage.getItem(TOKEN);
    }
    return null;
  }

  logOut() {
    sessionStorage.removeItem(AUTHENTICATION_USER);
    sessionStorage.removeItem(TOKEN);
  }

  executeBasicAuthenticationService(username: string, password: string) {
    const headersAuth = this.createBasicHeaderAuth(username, password);
    const headerBasicAuth = new HttpHeaders({ Authorization: headersAuth });

    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`, {
      headers: headerBasicAuth
    }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATION_USER, username);
          sessionStorage.setItem(TOKEN, headersAuth);
          return data;
        }
      )
    );
  }

  executeJWTAuthenticationService(username: string, password: string) {
    return this.http.post<any>(`${API_URL}/authenticate`, {
      username,
      password
    }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATION_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  createBasicHeaderAuth(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

}

export class AuthenticationBean {

  constructor(public message: string) { }
}
