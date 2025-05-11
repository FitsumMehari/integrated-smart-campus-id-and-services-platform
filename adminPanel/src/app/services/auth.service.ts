import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private modalService: ModalService
  ) {}

  private authUrl = `${environment.apiURL}auth`;

  _users: BehaviorSubject<any> = new BehaviorSubject([]);
  _response: BehaviorSubject<any> = new BehaviorSubject([]);
  _loggedUser: BehaviorSubject<any> = new BehaviorSubject([]);

  getLoggedInUserDetails() {
    const token = localStorage.getItem('token');
    this._loggedUser.next(jwtDecode(token || ''));
    return {
      id: this._loggedUser.value._id,
      username: this._loggedUser.value.username,
      studentId: this._loggedUser.value.studentId,
      email: this._loggedUser.value.email,
      gender: this._loggedUser.value.gender,
      phone: this._loggedUser.value.phone,
      userType: this._loggedUser.value.userType,
      profilePic: this._loggedUser.value.profilePic,
      isLoggedIn: this._loggedUser.value.isLoggedIn,
      isAdmin: this._loggedUser.value.isAdmin,
      isCafe: this._loggedUser.value.isCafe,
      isGate: this._loggedUser.value.isGate,
      isSchool: this._loggedUser.value.isSchool,
      isRegistrar: this._loggedUser.value.isRegistrar,
    };
  }

  login(user: any) {
    // console.log(user);

    this.http.post(this.authUrl + '/login', user).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
        this._response.subscribe((response) => {
          // console.log(response);
          if (response && response.message) {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.duration = 3000;
            this.snackBar.open(response.message, 'Close', config);
            if (response.message === 'Log In Successful!') {
              // Store user data in local storage or a service
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('token', response.accessToken);
              this._loggedUser.next(jwtDecode(response.accessToken));
              // console.log(this._loggedUser.value);
              this._response.next('');

              this.router.navigate(['/admin']);
            } else {
              console.error('Login failed');
            }
          }
        });
      },
      (error) => {}
    );
  }

  registerNewUser(newUser: any, profilePic: any) {
    const formData = new FormData();
    formData.append('user', JSON.stringify(newUser));
    formData.append('profilePic', profilePic);

    this.http.post(this.authUrl + '/user', formData).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
        //
        this._response.subscribe((response) => {
          // console.log(response);
          if (response && response.message) {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.duration = 3000;
            this.snackBar.open(response.message, 'Close', config);
            if (response.finalSavedUser) {
              this.modalService.closeAllModals();
            }
          }
        });
        this.router.navigateByUrl(this.router.url);
      },
      (error) => {}
    );
  }

  updateUser(user: any, profilePic: any) {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    formData.append('profilePic', profilePic);

    this.http.put(this.authUrl + '/user', formData).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
        //
        this._response.subscribe((response) => {
          // console.log(response);
          if (response && response.message) {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.duration = 3000;
            this.snackBar.open(response.message, 'Close', config);
            if (response.finalSavedUser) {
              this.modalService.closeAllModals();
            }
          }
        });
        this.router.navigateByUrl(this.router.url);
        console.log(this.router.url);
      },
      (error) => {}
    );
  }

  removeUser(userId: any) {
    this.http.delete(this.authUrl + '/user/' + userId).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
        //
        this._response.subscribe((response) => {
          // console.log(response);
          if (response && response.message) {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.duration = 3000;
            this.snackBar.open(response.message, 'Close', config);
          }
        });
        this.router.navigateByUrl(this.router.url);
      },
      (error) => {}
    );
  }

  forgotPassword(data: any) {
    this.http.post(`${this.authUrl}/forgot-password`, data).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
        //
        this._response.subscribe((response) => {
          // console.log(response);
          if (response && response.message) {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.duration = 3000;
            this.snackBar.open(response.message, 'Close', config);

            if (response.message === 'OTP sent to your email!') {
              localStorage.setItem('email', data.email);
              this.router.navigate(['/verifyotp']);
            }
          }
        });
      },
      (error) => {}
    );
  }
  verifyOTP(otp: any) {
    console.log(otp);
    const data = {
      email: localStorage.getItem('email'), otp: otp
    };
    this.http.post(`${this.authUrl}/verify-otp`, data).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
        //
        this._response.subscribe((response) => {
          // console.log(response);
          if (response && response.message) {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.duration = 3000;
            this.snackBar.open(response.message, 'Close', config);

            if (response.message === 'OTP verified') {
              this.router.navigate(['/createnewpassword']);
            }
          }
        });
      },
      (error) => {}
    );

  }
  resetPassword(newPassword: any) {
    const data = {
      email: localStorage.getItem('email'), newPassword: newPassword
    };
    console.log(data);

    this.http.post(`${this.authUrl}/reset-password`, data).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
        //
        this._response.subscribe((response) => {
          // console.log(response);
          if (response && response.message) {
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'top';
            config.duration = 3000;
            this.snackBar.open(response.message, 'Close', config);

            if (response.message === 'Password reset successfully') {
              this.router.navigate(['/login']);
            }
          }
        });
      },
      (error) => {}
    );
  }
}
