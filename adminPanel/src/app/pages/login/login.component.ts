import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}

  login() {
    localStorage.setItem("isLoggedIn", "true");
    this.router.navigate(['/admin'])
  }
}
