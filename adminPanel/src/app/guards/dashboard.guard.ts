import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class dashboardGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  user = {
    isLoggedIn: '',
    isAdmin: '',
    userType: '',
    id: '',
    username: '',
    email: '',
    phone: '',
    gender: '',
  };

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      this.user = this.authService.getLoggedInUserDetails();

      if (this.user) {
        if (this.user.userType === 'admin') {
          return true;
        } else if(this.user.userType === 'cafe') {
          this.router.navigate(['/admin/cafe']);
          return false
        }
         else if(this.user.userType === 'gate') {
          this.router.navigate(['/admin/gate']);
          return false
        }
         else if(this.user.userType === 'school') {
          this.router.navigate(['/admin/school']);
          return false
        } else {
          this.router.navigate(['/admin/registrar']);
          return false
        }
      } else {
        this.router.navigate(['/admin']);
        return false;
      }
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }
}
