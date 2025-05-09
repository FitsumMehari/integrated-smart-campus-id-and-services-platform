import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment.development';

interface DashboardData {
  adminsCount: number;
  studentsCount: number;
  noticesCount: number;
  messagesCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  //  Update these URLs to match your actual API endpoints
  private authUrl = `${environment.apiURL}auth`;
  private studentCountUrl = `${environment.apiURL}auth/users/all`;
  private noticesUrl = `${environment.apiURL}notice`;
  private messagesUrl = `${environment.apiURL}messages`;
  private activitiesUrl = `${environment.apiURL}activity`;

  _response: BehaviorSubject<any> = new BehaviorSubject([]);
  private _adminsCount: BehaviorSubject<any> = new BehaviorSubject([]);
  _users: BehaviorSubject<any> = new BehaviorSubject([]);
  _notices: BehaviorSubject<any> = new BehaviorSubject([]);
  _messages: BehaviorSubject<any> = new BehaviorSubject([]);
  _activities: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get(this.authUrl+'/users/all').subscribe(
      (allUsers) => {
        this._users.next([]);
        if(allUsers) {
          this._users.next(allUsers);
        }
        // console.log(users);

      },
      (error) => {}
    );
  }

  getNotices() {
    this.http.get(this.noticesUrl+'/all').subscribe(
      (notices) => {
        this._notices.next('');
        this._notices.next(notices);
        // console.log(notice);

      },
      (error) => {}
    );
  }

  getMessages() {
    this.http.get(this.messagesUrl+'/all').subscribe(
      (messages) => {
        this._messages.next('');
        this._messages.next(messages);
        // console.log(notice);

      },
      (error) => {}
    );
  }

  getActivities() {
    this.http.get(this.activitiesUrl+'/all').subscribe(
      (activities) => {
        this._activities.next('');
        this._activities.next(activities);
        // console.log(notice);

      },
      (error) => {}
    );
  }

  deleteMessage(id: string) {
    return this.http.delete(`${this.messagesUrl}/${id}`).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
      },
      (error) => {}
    );
  }

  deleteNotice(id: string) {
    return this.http.delete(`${this.noticesUrl}/${id}`).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
      },
      (error) => {}
    );
  }

  addNotice(notice: any) {
    console.log(notice);

    this.http.post(this.noticesUrl, notice).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
      },
      (error) => {}
    );
  }
  updateNotice(notice: any) {
    console.log("From Dashboard Service: " + notice);

    this.http.put(this.noticesUrl, notice).subscribe(
      (next) => {
        this._response.next('');
        this._response.next(next);
      },
      (error) => {}
    );
  }

}
