import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otpverification',
  templateUrl: './otpverification.component.html',
  styleUrls: ['./otpverification.component.css'],
})
export class OTPVerificationComponent implements OnInit {
  otpForm!: FormGroup; // Using the definite assignment assertion operator

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.otpForm = new FormGroup({
      digit1: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      digit2: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      digit3: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      digit4: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      digit5: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
      digit6: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    });
  }

  confirmOTP() {
    if (this.otpForm.valid) {
      const otpValue = Object.values(this.otpForm.value).join('');
      console.log('Entered OTP:', otpValue);
      console.log(otpValue);

      this.authService.verifyOTP(otpValue)

      // In a real application, you would verify the OTP with your backend
    } else {
      // Optionally handle invalid form (e.g., display error messages)
      console.log('OTP is invalid');
    }
  }

  backToSignIn() {
    console.log('Navigating back to sign in');
    this.router.navigate(['/login']);
    // In a real application, you would navigate to the sign-in page
  }
}
