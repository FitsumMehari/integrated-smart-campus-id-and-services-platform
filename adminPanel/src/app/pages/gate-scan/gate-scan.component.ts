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
import { GateScanService } from '../../services/gate-scan.service'; // Import the service

@Component({
  selector: 'app-gate-scan',
  templateUrl: './gate-scan.component.html',
  styleUrls: ['./gate-scan.component.css'],
  standalone: false,
})
export class GateScanComponent implements AfterViewInit {
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: 300, // Smaller width
        height: 300, // Smaller height
      },
    },
  };

  public qrCodeResult: ScannerQRCodeResult[] = [];
  public belongings: any[] = []; // Array to store fetched belongings
  public loading: boolean = false;

  public scanError: any;
  public errorMessage: string | null = null;
  public apiResponse: any;

  // for hiding the video
  hasScanned:boolean = false

  newSerialKey: any = ''

  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  @ViewChild('select1') select1!: any;

  constructor(
    private qrcode: NgxScannerQrcodeService,
    private gateScanService: GateScanService
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
    this.enterGate(scannedString);
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

  enterGate(qrCodeValue: string): void {
    if (qrCodeValue) {
      this.gateScanService.sendQrCodeId(qrCodeValue).subscribe({
        // Use the service here
        next: (response) => {
          console.log('Entry Response:', response);
          this.errorMessage = null;
          this.apiResponse = response;
          console.log(this.apiResponse.foundUser._id);

          this.getItems(this.apiResponse.foundUser._id)
        },
        error: (error) => {
          console.error('Entry Error:', error);
          this.errorMessage = 'Failed to process entry. Please try again.';
          this.apiResponse = null;
        },
      });
    }
  }

  getItems(filter: any): void {
    this.loading = true; // Set loading to true before making the API call
    this.gateScanService.getItemBelongings(filter).subscribe({
        next: (response:any) => {
            console.log('Items Response:', response);
            this.loading = false; // Set loading to false after receiving the response
            this.belongings = response.belongings || []; // Store the belongings, default to empty array if undefined.
            this.errorMessage = null; // Clear any previous error message
        },
        error: (error:any) => {
            console.error('Items Error:', error);
            this.loading = false; // Set loading to false on error
            this.errorMessage = error.message || 'Failed to fetch items.'; // Set an appropriate error message
            this.belongings = [];
        },
    });
}


submitSerialKey(serialKey: string, userId:string) {
  // You can add your logic to handle the submitted serial key here
  const itemData = {
    userId: userId,
    serialKey: serialKey
  };
  this.gateScanService.addItemBelongings(itemData).subscribe({
    next: (response:any) => {
      if(response) {
        console.log('Item added successfully:', response);
      this.getItems(userId)
      }
      // Optionally clear the input field if you have the template reference
      // this.serialKeyInput.nativeElement.value = '';
    },
    error: (error:any) => {
      console.error('Error adding item:', error);
      // Handle the error, e.g., display an error message to the user
    }
  });
}

deleteItem(serialKey:any) {
  this.gateScanService.deleteItemBelongings(serialKey)
  this.getItems(this.apiResponse.foundUser._id)
}

  reload() {
    window.location.reload()
  }
}

