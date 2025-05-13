// cafe-scan.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface ApiResponse {
  message: string;
  foundUser?: any; // Adjust the type if 'foundUser' has a specific structure
}

@Injectable({
  providedIn: 'root',
})
export class CafeScanService {
  private apiUrl = `${environment}cafe/enter`; // Your API endpoint

  constructor(private http: HttpClient) {}

  sendQrCodeId(qrCodeId: any): Observable<ApiResponse> {
    // const userId = JSON.parse(qrCode)
    console.log(qrCodeId);

    return this.http.post<ApiResponse>(this.apiUrl, { id: qrCodeId });
  }
}
