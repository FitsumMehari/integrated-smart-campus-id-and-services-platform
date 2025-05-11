import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  hidePassword = true;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService,
  ) {
    this.matIconRegistry.addSvgIcon(
      'eye',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../public/eye.svg') // Adjust path as needed
    );
    this.matIconRegistry.addSvgIcon(
      'eye-off',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../public/eye-off.svg') // Adjust path as needed
    );
  }

  login() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      // console.log(
      //   'Logging in with:',
      //   this.emailFormControl.value,
      //   this.passwordFormControl.value
      // );
      // Authentication logic here
      // localStorage.setItem('isLoggedIn', 'true');
      this.authService.login({
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
      });


    }
  }

  forgotPassword() {
    console.log('Forgot password clicked');
    // Forgot password logic here
    this.router.navigate(['/forgotpassword']);
  }
}
