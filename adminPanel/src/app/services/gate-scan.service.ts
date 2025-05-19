// cafe-scan.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

interface ApiResponse {
  message: string;
  foundUser?: any; // Adjust the type if 'foundUser' has a specific structure
}

@Injectable({
  providedIn: 'root',
})
export class GateScanService {
  private gateApiUrl = `${environment.apiURL}gate/enter`; // Your API endpoint.  Make sure environment.gateApiUrl is correctly configured
  private itemsApiUrl = `${environment.apiURL}belongings`; // Your API endpoint.  Make sure environment.itemsApiUrl is correctly configured

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
    return this.http.post<ApiResponse>(this.gateApiUrl, {
      id: qrCodeId.userId,
    });
  }

  /**
   * Retrieves item belongings based on a filter.
   * @param filter The filter to apply (e.g., 'all' or a specific ID).
   * @returns An Observable of the API response containing the belongings.
   */
  getItemBelongings(filter: string): Observable<ApiResponse> {
    const url = `${this.itemsApiUrl}/${filter}`; // Construct the URL
    return this.http.get<ApiResponse>(url).pipe(
      catchError((error) => {
        console.error('Error fetching belongings:', error);
        // Handle 404 Not Found, return default value
        if (error.status === 404) {
          return throwError({ message: 'No items found' });
        }
        return throwError(error);
      })
    );
  }

  /**
   * Adds new item belongings.
   * @param itemData The data of the item to add (userId and serialKey).
   * @returns An Observable of the API response.
   */
  addItemBelongings(itemData: {
    userId: string;
    serialKey: string;
  }): Observable<ApiResponse> {
    if (!itemData.userId || !itemData.serialKey) {
      return throwError({ message: 'Please fill in the required inputs' });
    }
    return this.http.post<ApiResponse>(this.itemsApiUrl, itemData);
  }

   /**
   * Adds new item belongings.
   * @param itemData The data of the item to add (userId and serialKey).
   * @returns An Observable of the API response.
   */
   deleteItemBelongings(serialKey:any): any {
    if (!serialKey) {
      return throwError({ message: 'Please fill in the required inputs' });
    }
    console.log(serialKey);

    return this.http.delete<any>(`${this.itemsApiUrl}/${serialKey}`).subscribe()
  }
}
