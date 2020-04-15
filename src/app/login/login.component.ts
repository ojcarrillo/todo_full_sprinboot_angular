import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../services/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../services/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'demo';
  password = '';
  errorMessage = 'Usuario/password invalido';
  invalidLogin = false;

  constructor(private router: Router, private auth: HardcodedAuthenticationService, private basicAuth: BasicAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    if (this.auth.authenticate(this.username, this.password)) {
      this.invalidLogin = false;
      this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
    }
  }

  handleBasicAuthLogin(): void {
    this.basicAuth.executeBasicAuthenticationService(this.username, this.password).subscribe(
      resp => {
        this.invalidLogin = false;
        this.router.navigate(['welcome', this.username]);
      },
      error => {
        this.invalidLogin = true;
      }
    );
  }

  handleJWTAuthLogin(): void {
    this.basicAuth.executeJWTAuthenticationService(this.username, this.password).subscribe(
      resp => {
        this.invalidLogin = false;
        this.router.navigate(['welcome', this.username]);
      },
      error => {
        this.invalidLogin = true;
      }
    );
  }
}
