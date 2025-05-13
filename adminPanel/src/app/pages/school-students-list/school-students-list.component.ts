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
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

export interface Student {
  id: number;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  cafeStatus: 'Active' | 'Inactive';
  department: string;
  studentId: string;
}

/**
 * @title Table with pagination
 */

@Component({
    selector: 'app-school-students-list',
    templateUrl: './school-students-list.component.html',
    styleUrl: './school-students-list.component.css',
    standalone: false
})
export class SchoolStudentsListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns: string[] = [
    'select',
    // 'id',
    'name',
    'gender',
    'cafeStatus',
    'department',
    'studentId',
    // 'manage',
  ];
  students: any[] = [];

  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  pageSize = 5;
  filterValue = '';
  private usersSubscription: Subscription | undefined; // Add this line
  private openModalSubscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Using the definite assignment assertion

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private modalService: ModalService,
    private dashboardService: DashboardService,
    private ngZone: NgZone
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
    this.getUsers(); // Call this method
    this.dataSource = new MatTableDataSource<any>(this.students);
    this.ngZone.run(() => {});
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }

  editStudent(student: Student) {
    console.log('Edit student:', student);
    this.modalService.openEditStudent(student);
    // Implement your edit logic here
  }

  getUsers(): void {
    this.usersSubscription = this.dashboardService._users.subscribe(
      (users: any) => {
        if (users.allUsers && users.allUsers.length > 0) {
          this.students = users.allUsers.filter(
            (user: any) => user.userType === 'student'
          );
        }

        this.ngZone.run(() => {});
      }
    );
    this.dashboardService.getUsers();
  }

  deleteStudent(student: Student) {
    console.log('Delete student:', student);
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
  addNewStudent() {
    console.log('Add new student');
    this.modalService.openAddStudent();
  }
  ngOnDestroy(): void {
    if (this.openModalSubscription) {
      this.openModalSubscription.unsubscribe();
    }
    if (this.usersSubscription) {
      // Add this
      this.usersSubscription.unsubscribe();
    }
  }
}
