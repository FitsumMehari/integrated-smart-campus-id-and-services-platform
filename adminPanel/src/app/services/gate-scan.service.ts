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
export class GateScanService {
  private apiUrl = `${environment.apiURL}gate/enter`; // Your API endpoint.  Make sure environment.apiUrl is correctly configured

  errorResponse: any = { message: 'Invalid ID' };

  constructor(private http: HttpClient) {}

  sendQrCodeId(qrCodeId: any): Observable<ApiResponse> {
    try {
      qrCodeId = JSON.parse(qrCodeId);
    } catch (error) {
      console.log(error);
      return this.errorResponse;
    }
    console.log(qrCodeId.userId);
    return this.http.post<ApiResponse>(this.apiUrl, { id: qrCodeId.userId });
  }
}
