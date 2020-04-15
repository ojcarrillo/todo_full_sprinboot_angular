import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string) {
    if (username === 'demo' && password === '123') {
      sessionStorage.setItem('usuario', username);
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    // tslint:disable-next-line:prefer-const
    let user = sessionStorage.getItem('usuario');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('usuario');
  }
}
