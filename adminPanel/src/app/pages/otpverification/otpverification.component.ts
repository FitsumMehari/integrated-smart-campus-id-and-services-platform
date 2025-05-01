import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css'],
})
export class OTPVerificationComponent {
  constructor(private router: Router){}
  otpFormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);

  confirmOTP() {
    if (this.otpFormControl.valid) {
      console.log('Entered OTP:', this.otpFormControl.value);
      // In a real application, you would verify the OTP with your backend
    }
  }

  backToSignIn() {
    console.log('Navigating back to sign in');
    this.router.navigate(['/login']);
    // In a real application, you would navigate to the sign-in page
  }
}
