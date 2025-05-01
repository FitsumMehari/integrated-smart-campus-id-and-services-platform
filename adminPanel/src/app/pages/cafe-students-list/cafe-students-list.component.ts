import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
import { ModalService } from '../../services/modal.service';

export interface Student {
  id: number;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  cafeStatus: 'Active' | 'Inactive';
  department: string;
  studentId: string;
}

const ELEMENT_DATA: Student[] = [
  {
    id: 1,
    name: 'John Doe',
    gender: 'Male',
    cafeStatus: 'Active',
    department: 'Computer Science',
    studentId: 'eitm/ur123456/78'
  },
  {
    id: 2,
    name: 'Jane Smith',
    gender: 'Female',
    cafeStatus: 'Inactive',
    department: 'Electrical Engineering',
    studentId: 'eitm/ur123456/78'

  },
  {
    id: 3,
    name: 'Peter Jones',
    gender: 'Male',
    cafeStatus: 'Active',
    department: 'Mechanical Engineering',
    studentId: 'eitm/ur123456/78'

  },
  {
    id: 4,
    name: 'Alice Brown',
    gender: 'Female',
    cafeStatus: 'Active',
    department: 'Civil Engineering',
    studentId: 'eitm/ur123456/78'

  },
  {
    id: 5,
    name: 'Bob Green',
    gender: 'Male',
    cafeStatus: 'Inactive',
    department: 'Chemical Engineering',
    studentId: 'eitm/ur123456/78'

  },
  {
    id: 6,
    name: 'Eva White',
    gender: 'Female',
    cafeStatus: 'Active',
    department: 'Physics',
    studentId: 'eitm/ur123456/78'

  },
  {
    id: 7,
    name: 'David Black',
    gender: 'Male',
    cafeStatus: 'Inactive',
    department: 'Mathematics',
    studentId: 'eitm/ur123456/78'

  },
  {
    id: 8,
    name: 'Sophia Gray',
    gender: 'Female',
    cafeStatus: 'Active',
    department: 'Biology',
    studentId: 'eitm/ur123456/78'

  },
  {
    id: 9,
    name: 'Michael Blue',
    gender: 'Male',
    cafeStatus: 'Inactive',
    department: 'Chemistry',
    studentId: 'eitm/ur123456/78'

  },
  {
    id: 10,
    name: 'Olivia Red',
    gender: 'Female',
    cafeStatus: 'Active',
    department: 'Economics',
    studentId: 'eitm/ur123456/78'

  },
  {
    id: 11,
    name: 'Samuel Green',
    gender: 'Male',
    cafeStatus: 'Active',
    department: 'History',
    studentId: 'eitm/ur123456/78'

  },
  {
    id: 12,
    name: 'Grace Yellow',
    gender: 'Female',
    cafeStatus: 'Inactive',
    department: 'Literature',
    studentId: 'eitm/ur123456/78'

  },
];

/**
 * @title Table with pagination
 */

@Component({
  selector: 'app-cafe-students-list',
  templateUrl: './cafe-students-list.component.html',
  styleUrls: ['./cafe-students-list.component.css'],
})
export class CafeStudentsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'select',
    'id',
    'name',
    'gender',
    'cafeStatus',
    'department',
    'studentId',
    'manage',
  ];
  dataSource = new MatTableDataSource<Student>(ELEMENT_DATA);
  selection = new SelectionModel<Student>(true, []);
  pageSize = 5;
  filterValue = '';


  @ViewChild(MatPaginator) paginator!: MatPaginator; // Using the definite assignment assertion

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private modalService: ModalService) {
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
}
