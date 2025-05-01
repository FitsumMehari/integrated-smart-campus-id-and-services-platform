import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatPaginator } from '@angular/material/paginator';

export interface Message {
  id: number;
  message: string;
  description: string;
}

const ELEMENT_DATA: Message[] = [
  { id: 1, message: 'Welcome to the Cafe!', description:'This is sample description' },
  { id: 2, message: 'Please order at the counter.', description:'This is sample description' },
  { id: 3, message: 'Free Wi-Fi available.', description:'This is sample description' },
  { id: 4, message: 'Today\'s special is soup and salad.', description:'This is sample description' },
  { id: 5, message: 'Enjoy your meal!', description:'This is sample description' },
  { id: 6, message: 'Try our new coffee blend.', description:'This is sample description' },
  { id: 7, message: 'Don\'t forget to rate us!', description:'This is sample description' },
  { id: 8, message: 'Follow us on social media.', description:'This is sample description' },
  { id: 9, message: 'Opening hours: 8 AM - 8 PM.', description:'This is sample description' },
  { id: 10, message: 'Student discounts available.', description:'This is sample description' },
  { id: 11, message: 'Happy Hour 5 PM - 7 PM', description:'This is sample description' },
  { id: 12, message: 'We accept cash and credit cards', description:'This is sample description' },
];

@Component({
  selector: 'app-cafe-message-list',
  templateUrl: './cafe-messages-list.component.html',
  styleUrls: ['./cafe-messages-list.component.css'],
})
export class CafeMessagesListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['select', 'id', 'message','description', 'manage',];
  dataSource = new MatTableDataSource<Message>(ELEMENT_DATA);
  selection = new SelectionModel<Message>(true, []);
  pageSize = 5;
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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

  checkboxLabel(row?: Message): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  editMessage(message: Message) {
    console.log('Edit message:', message);
    // Implement your edit logic here
  }

  deleteMessage(message: Message) {
    console.log('Delete message:', message);
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
  addNewMessage() {
    console.log('Add new Message');
  }
}

