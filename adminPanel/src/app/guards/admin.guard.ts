import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  user = {
    isLoggedIn: '',
    isAdmin: '',
    userType: '',
    id: '',
    username: '',
    email: '',
    phone: '',
    gender: ''
  };

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if(token) {
      this.user = this.authService.getLoggedInUserDetails();

      if (this.user) {
        if (
          this.user.isLoggedIn &&
          this.user.isAdmin &&
          this.user.userType == 'admin'
        ) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
        return false;
    }

  }
}
