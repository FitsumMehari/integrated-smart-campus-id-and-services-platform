import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})

export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log(isLoggedIn);

    if (isLoggedIn == "true") {
      return true
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }
}
