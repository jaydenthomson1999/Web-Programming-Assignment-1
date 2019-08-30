import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username = '';
  private password = '';

  constructor(private loginService: LoginServiceService) { }

  ngOnInit() {
  }

  private loginAttempt() {
    this.loginService.login(this.username, this.password).then(data => {
      if (sessionStorage.getItem('user') != null) {
        // redirect
      }
    });
  }
}
