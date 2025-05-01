import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-createnewpassword',
  templateUrl: './createnewpassword.component.html',
  styleUrls: ['./createnewpassword.component.css'],
})
export class CreatenewpasswordComponent {
  hidePassword = true;
  hideConfirmPassword = true;
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmPasswordFormControl = new FormControl('', [Validators.required, this.mustMatch(this.passwordFormControl)]);

  mustMatch(controlToMatch: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!controlToMatch || !control || !controlToMatch.value || !control.value) {
        return null;
      }
      return control.value === controlToMatch.value ? null : { mustMatch: true };
    };
  }

  onSubmit() {
    if (this.passwordFormControl.valid && this.confirmPasswordFormControl.valid && this.passwordFormControl.value === this.confirmPasswordFormControl.value) {
      console.log('Password reset initiated:', this.passwordFormControl.value);
      // In a real application, you would send this data to your backend
    }
  }
}
