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
import { ModalService } from '../../services/modal.service';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

export interface Notice {
  id: number;
  name: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-gate-notices-list',
  templateUrl: './gate-notices-list.component.html',
  styleUrl: './gate-notices-list.component.css',
})
export class GateNoticesListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns: string[] = [
    'select',
    // 'id',
    'updatedAt',
    'title',
    'description',
    'manage',
  ];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  pageSize = 5;
  filterValue = '';

  notices: any = [];
  private dashboardSubscribtion: Subscription | undefined; // Add this line
  private openModalSubscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private modalService: ModalService,
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
    // No need to set the paginator here anymore
    this.getNotices(); // Call this method
    this.dataSource = new MatTableDataSource<any>(this.notices);
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

  checkboxLabel(row?: Notice): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  addNewNotice() {
    this.modalService.openAddNotice();
    this.getNotices();
  }

  editNotice(notice: Notice) {
    console.log('Edit notice:', notice);
    this.modalService.openEditNotice(notice);
    this.getNotices();
    // Implement your edit logic here
  }

  getNotices(): void {
    this.dashboardService.getNotices();
    this.dashboardSubscribtion = this.dashboardService._notices.subscribe(
      (next: any) => {
        if (next.notices && next.notices.length > 0) {
          this.notices = next.notices.filter(
            (notice: any) => notice.category === 'gate'
          );
        }

        this.ngZone.run(() => {});
      }
    );
  }

  deleteNotice(notice: any) {
    console.log('Delete notice:', notice);
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
              width: '400px',
              data: {
                title: 'Confirm Removal',
                message: `Are you sure you want to remove the notice: ${
                  notice.title || notice.description
                }? This action cannot be undone.`,
                confirmButtonText: 'Remove',
                cancelButtonText: 'Cancel',
              },
            });
            // User cancelled, do nothing or log it
            dialogRef.afterClosed().subscribe((result) => {
              if (result) {
                // User confirmed, proceed with removal
                this.dashboardService.deleteNotice(notice._id);
                this.getNotices();
              } else {
                // User cancelled, do nothing or log it
                console.log('Admin removal cancelled');
              }
            });

            this.getNotices();
    // Implement your delete logic here
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  clearFilter() {
    this.filterValue = '';
    this.dataSource.filter = '';
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
