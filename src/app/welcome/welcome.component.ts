import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../services/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = '';
  welcomeMessage = '';

  constructor(private route: ActivatedRoute, private service: WelcomeDataService) {
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params.name;
  }

  getWelcomeMessage() {
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSucessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSucessfulResponse(response) {
    this.welcomeMessage = response.message;
  }

  handleErrorResponse(error) {
    this.welcomeMessage = error.error.message;
  }

  getWelcomeMessageWithParameter() {
    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(
      response => this.handleSucessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }
}
