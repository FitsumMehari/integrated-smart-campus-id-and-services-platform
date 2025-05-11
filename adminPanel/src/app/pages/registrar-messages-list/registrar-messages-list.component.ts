import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

export interface Message {
  id: number;
  message: string;
  description: string;
}

@Component({
  selector: 'app-registrar-messages-list',
  templateUrl: './registrar-messages-list.component.html',
  styleUrl: './registrar-messages-list.component.css',
})
export class RegistrarMessagesListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns: string[] = [
    'select',
    // 'id',
    'updatedAt',
    'message',
    // 'description',
    'manage',
  ];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<Message>(true, []);
  pageSize = 5;
  filterValue = '';

  messages: any = [];
  private dashboardSubscribtion: Subscription | undefined; // Add this line
  private openModalSubscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private dashboardService: DashboardService,
    private ngZone: NgZone,
    private snackBar: MatSnackBar,
                private dialog: MatDialog

  ) {
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/edit.svg')
    );
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/delete.svg')
    );
  }

  ngOnInit() {
    this.getMessages(); // Call this method
    this.dataSource = new MatTableDataSource<any>(this.messages);
    this.ngZone.run(() => {});
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  checkboxLabel(row?: Message): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  editMessage(message: Message) {
    console.log('Edit message:', message);
    this.getMessages();
    // Implement your edit logic here
  }

  getMessages(): void {
    this.dashboardService.getMessages();
    this.dashboardSubscribtion = this.dashboardService._messages.subscribe(
      (next: any) => {
        if (next.messages && next.messages.length > 0) {
          this.messages = next.messages.filter(
            (message: any) => message.category === 'registrar'
          );
        }

        this.ngZone.run(() => {});
      }
    );
  }

    deleteMessage(message: any) {
      console.log('Delete message:', message);

      this.dashboardService._response.subscribe((response) => {
        console.log(response);
        if (response && response.message) {
          const config = new MatSnackBarConfig();
          config.verticalPosition = 'top';
          config.duration = 3000;
          this.snackBar.open(response.message, 'Close', config);

          this.getMessages();
        }
      });
      // Implement your delete logic here
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: {
          title: 'Confirm Removal',
          message: `Are you sure you want to remove the message: ${
            message.message
          }? This action cannot be undone.`,
          confirmButtonText: 'Remove',
          cancelButtonText: 'Cancel',
        },
      });
      // User cancelled, do nothing or log it
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // User confirmed, proceed with removal
          this.dashboardService.deleteMessage(message._id);
          this.getMessages();
        } else {
          // User cancelled, do nothing or log it
          // console.log('Admin removal cancelled');
        }
      });

      this.getMessages();
    }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  clearFilter() {
    this.filterValue = '';
    this.dataSource.filter = '';
  }
  addNewMessage() {
    console.log('Add new Message');
  }

  ngOnDestroy(): void {
    if (this.openModalSubscription) {
      this.openModalSubscription.unsubscribe();
    }
    if (this.dashboardSubscribtion) {
      // Add this
      this.dashboardSubscribtion.unsubscribe();
    }
  }
}
