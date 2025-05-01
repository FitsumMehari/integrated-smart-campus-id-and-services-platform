import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';
import { ModalService } from '../../services/modal.service';

export interface Notice {
  id: number;
  name: string;
  title: string;
  description: string;
}

const ELEMENT_DATA: Notice[] = [
  { id: 1, name: 'John Doe', title: 'Important Announcement', description: 'This is an important announcement for all students.' },
  { id: 2, name: 'Jane Smith', title: 'Cafeteria Closed', description: 'The cafeteria will be closed for maintenance on Friday.' },
  { id: 3, name: 'Peter Jones', title: 'New Menu Items', description: 'Check out the new menu items available this week!' },
  { id: 4, name: 'Alice Brown', title: 'Holiday Hours', description: 'The cafe will be open from 8 AM to 12 PM on the holiday.' },
  { id: 5, name: 'Bob Green', title: 'Price Increase', description: 'Please note that there will be a slight price increase starting next month.' },
  { id: 6, name: 'Eva White', title: 'Special Event', description: 'Join us for a special event at the cafe on Saturday!' },
  { id: 7, name: 'David Black', title: 'Lost and Found', description: 'A pair of glasses was found in the cafe. Please claim them at the counter.' },
  { id: 8, name: 'Sophia Gray', title: 'New Coffee Blend', description: 'Try our new premium coffee blend, available now!' },
  { id: 9, name: 'Michael Blue', title: 'Website Update', description: 'Our website is undergoing maintenance and may be temporarily unavailable.' },
  { id: 10, name: 'Olivia Red', title: 'Customer Survey', description: 'Please take a moment to fill out our customer survey.' },
  { id: 11, name: 'Samuel Green', title: 'Free Coffee', description: 'Free coffee today!' },
  { id: 12, name: 'Grace Yellow', title: 'New Discount', description: '10% discount for students' },
];

@Component({
  selector: 'app-cafe-notices-list',
  templateUrl: './cafe-notices-list.component.html',
  styleUrls: ['./cafe-notices-list.component.css'],
})
export class CafeNoticesListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'id', 'name', 'title', 'description', 'manage'];
  dataSource = new MatTableDataSource<Notice>(ELEMENT_DATA);
  selection = new SelectionModel<Notice>(true, []);
  pageSize = 5;
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Notice): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addNewNotice() {
    this.modalService.openAddNotice();
  }

  editNotice(notice: Notice) {
    console.log('Edit notice:', notice);
    this.modalService.openEditNotice(notice)
    // Implement your edit logic here
  }

  deleteNotice(notice: Notice) {
    console.log('Delete notice:', notice);
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
}

