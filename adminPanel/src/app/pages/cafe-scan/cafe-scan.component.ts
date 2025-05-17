// cafe-scan.component.ts
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeComponent,
  ScannerQRCodeDevice,
  NgxScannerQrcodeService,
} from 'ngx-scanner-qrcode';
import { delay } from 'rxjs';
import { CafeScanService } from '../../services/cafe-scan.service'; // Import the service

@Component({
  selector: 'app-cafe-scan',
  templateUrl: './cafe-scan.component.html',
  styleUrls: ['./cafe-scan.component.css'],
  standalone: false,
})
export class CafeScanComponent implements AfterViewInit {
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: 300, // Smaller width
        height: 300, // Smaller height
      },
    },
  };

  public qrCodeResult: ScannerQRCodeResult[] = [];
  public scanError: any;
  public errorMessage: string | null = null;
  public apiResponse: any;

  // for hiding the video
  hasScanned:boolean = false

  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  @ViewChild('select1') select1!: any;

  constructor(
    private qrcode: NgxScannerQrcodeService,
    private cafeScanService: CafeScanService
  ) {} // Inject the service

  ngAfterViewInit(): void {
    console.log('NgAfterViewInit called');
    this.action.isReady.pipe(delay(1000)).subscribe(() => {
      console.log('Scanner isReady, calling start');
      this.handle(this.action, 'start');
    }, (error) => {
      console.error('isReady error', error);
    });
  }


public onEvent(e: any): void {
  console.log('onEvent triggered:', e);
  console.log('Type of e:', typeof e);
  console.log('e itself:', e); // Log the entire 'e' object

  if (Array.isArray(e)) {
    console.log('e is an array');
    if (e.length > 0) {
      console.log('e has elements');
      console.log('First element of e:', e[0]);
      if (e[0]?.value) {
        console.log('e[0] has value:', e[0].value);
        this.qrCodeResult = e;
        this.processScannedData(e[0].value);
      } else {
        console.warn('e[0] does not have a value property');
        this.scanError = 'Could not read QR code value from array (e[0] missing value).';
      }
    } else {
      console.warn('e is an empty array');
      this.scanError = 'Could not read QR code value from array (empty array).';
    }
  } else if (e && e.value) {
    console.log('e is an object with value:', e.value);
    this.qrCodeResult = [e];
    this.processScannedData(e.value);
  } else {
    console.warn('e is not an array or an object with a value property');
    this.scanError = 'Could not read QR code value (e is not an expected format).';
  }
}
  private processScannedData(data: Uint8Array | Int8Array | string): void {
    let scannedString: string;
    if (data instanceof Uint8Array || data instanceof Int8Array) {
      try {
        const decoder = new TextDecoder('utf-8');
        scannedString = decoder.decode(data);
      } catch (error) {
        console.error('Error decoding QR code data:', error);
        this.scanError = 'Failed to decode QR code.';
        return;
      }
    } else if (typeof data === 'string') {
      scannedString = data;
      // for hiding the video
      this.hasScanned = true
      //
    } else {
      console.warn('Unknown QR code data type:', data);
      this.scanError = 'Unknown QR code data format.';
      return;
    }
    this.enterCafe(scannedString);
  }

 public handle(action: any, fn: string): void {
  console.log('handle called with:', fn);
  const playDeviceFacingBack = (devices: ScannerQRCodeDevice[]) => {
    console.log('playDeviceFacingBack called with devices:', devices);
    const device = devices.find(f => (/back|rear|environment/gi.test(f.label)));
    const deviceIdToPlay = device ? device.deviceId : devices[0].deviceId;
    console.log('playDevice with deviceId:', deviceIdToPlay);
    action.playDevice(deviceIdToPlay);
  };

  if (fn === 'start') {
    action[fn](playDeviceFacingBack).subscribe(
      (r: any) => console.log(fn, r),
      (error: any) => (this.scanError = error)
    );
  } else {
    action[fn]().subscribe(
      (r: any) => console.log(fn, r),
      (error: any) => (this.scanError = error)
    );
  }
}

  enterCafe(qrCodeValue: string): void {
    if (qrCodeValue) {
      this.cafeScanService.sendQrCodeId(qrCodeValue).subscribe({
        // Use the service here
        next: (response) => {
          console.log('Entry Response:', response);
          this.errorMessage = null;
          this.apiResponse = response;
        },
        error: (error) => {
          console.error('Entry Error:', error);
          this.errorMessage = 'Failed to process entry. Please try again.';
          this.apiResponse = null;
        },
      });
    }
  }

  reload() {
    window.location.reload()
  }
}

