import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';


export class HelloWorldBean {
  constructor(message: string) {

  }

}
@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('${API_URL}/hello-world-bean');
  }

  executeHelloWorldBeanServiceWithPathVariable(name) {
    // const headerBasicAuth = new HttpHeaders({ Authorization: this.createBasicHeaderAuth() });

    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world/path-variable/${name}`
      /*, {
        headers: headerBasicAuth
      }*/
    );
  }

  /*createBasicHeaderAuth() {
    const username = 'demo';
    const password = '123';
    const headerString = 'Basic ' + window.btoa(username + ':' + password);
    return headerString;
  }*/
}
