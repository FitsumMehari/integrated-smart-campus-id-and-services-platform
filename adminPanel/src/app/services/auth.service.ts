import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private authUrl = `${environment.apiURL}auth`;

  _users: BehaviorSubject<any> = new BehaviorSubject([]);
  _response: BehaviorSubject<any> = new BehaviorSubject([]);

  registerNewUser(newUser: any, profilePic: any) {
    const formData = new FormData();
    formData.append('user', JSON.stringify(newUser));
    formData.append('profilePic', profilePic);

    this.http.post(this.authUrl + '/user', formData).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
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
      },
      (error) => {}
    );
  }

  removeUser(userId: any) {
    this.http.delete(this.authUrl + '/user/' + userId).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
      },
      (error) => {}
    );
  }


}
