// modal.service.ts
import { Injectable, EventEmitter } from '@angular/core';

export interface Notice {
  id: number;
  name: string;
  title: string;
  description: string;
}
export interface Student {
  id: number;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  cafeStatus: 'Active' | 'Inactive';
  department: string;
  studentId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  openAddAdminModal = new EventEmitter<void>();
  closeAddAdminModal = new EventEmitter<void>();

  openEditProfileModal =  new EventEmitter<any | null>();
  closeEditProfileModal = new EventEmitter<void>();

  openAddNoticeModal = new EventEmitter<void>();
  closeAddNoticeModal = new EventEmitter<void>();

  // openEditNoticeModal = new EventEmitter<void>();
  openEditNoticeModal = new EventEmitter<any | null>();
  closeEditNoticeModal = new EventEmitter<void>();

  openAddStudentModal = new EventEmitter<void>();
  closeAddStudentModal = new EventEmitter<void>();

  openEditStudentModal = new EventEmitter<any | null>();
  closeEditStudentModal = new EventEmitter<void>();

  showAddAdmin = false; // State to control modal visibility
  showAddStudent = false; // State to control modal visibility
  showEditStudent = false; // State to control modal visibility
  showAddNotice = false; // State to control modal visibility
  showEditNotice = false; // State to control modal visibility
  showEditProfile = false; // State to control modal visibility

  // public noticeDataToEdit: any | null = null;
  public selectedStudent: any | null = null;
  public selectedAdmin: any | null = null;
  public selectedNotice: any | null = null;

  openAddAdmin(): void {
    this.showAddAdmin = true;
    this.openAddAdminModal.emit();
    console.log(this.showAddAdmin);

  }

  closeAdmin(): void {
    this.showAddAdmin = false;
    this.closeAddAdminModal.emit();
  }

  openAddStudent(): void {
    this.showAddStudent = true;
    this.openAddStudentModal.emit();
    console.log(this.showAddStudent);

  }

  closeAddStudent(): void {
    this.showAddStudent = false;
    this.closeAddStudentModal.emit();
  }
  openEditStudent(student:any): void {
    this.showEditStudent = true;
    // this.openEditStudentModal.emit();
    this.openEditStudentModal.emit(student); // Emit the notice data
    this.selectedStudent = student;
    console.log(this.showEditStudent);
    console.log(student);
  }

  closeEditStudent(): void {
    this.showEditStudent = false;
    this.closeEditStudentModal.emit();
  }

  openAddNotice(): void {
    this.showAddNotice = true;
    this.openAddNoticeModal.emit();
    console.log(this.showAddNotice);

  }

  closeAddNotice(): void {
    this.showAddNotice = false;
    this.closeAddNoticeModal.emit();
  }
  openEditNotice(notice:any): void {
   // Change the parameter type to Notice
   this.showEditNotice = true;
   this.openEditNoticeModal.emit(notice); // Emit the notice data
   this.selectedNotice = notice; // Store the notice data.  No longer used here.
  //  console.log(this.showEditNotice);
  //  console.log(notice);

  }

  closeEditNotice(): void {
    this.showEditNotice = false;
    // this.closeEditNoticeModal.emit();
    this.openEditNoticeModal.emit(null); // Emit null to signal close.

  }


  openEditProfile(admin:any): void {
    this.showEditProfile = true;
    this.openEditProfileModal.emit();
    this.openEditProfileModal.emit(admin); // Emit the notice data
    this.selectedAdmin = admin;
    console.log(this.showEditProfile);

  }

  closeEditProfile(): void {
    this.showEditProfile = false;
    this.closeEditProfileModal.emit();
  }
}
