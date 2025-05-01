import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  constructor(private router: Router){}
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  sendOTP() {
    if (this.emailFormControl.valid) {
      console.log('Sending OTP to:', this.emailFormControl.value);
      // In a real application, you would send an OTP to the provided email
    }
  }

  backToSignIn() {
    console.log('Navigating back to sign in');
    // In a real application, you would navigate to the sign-in page
    this.router.navigate(['/login'])

  }
}
