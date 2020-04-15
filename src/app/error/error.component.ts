import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage = 'Ha ocurrido un error, comuniquese con soporte!!!';

  constructor() { }

  ngOnInit(): void {
  }

}
