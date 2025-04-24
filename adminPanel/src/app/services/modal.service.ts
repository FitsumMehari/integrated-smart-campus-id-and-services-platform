// modal.service.ts
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  openAddAdminModal = new EventEmitter<void>();
  closeModal = new EventEmitter<void>();
  showAddAdmin = false; // State to control modal visibility

  openAddAdmin(): void {
    this.showAddAdmin = true;
    this.openAddAdminModal.emit();
    console.log(this.showAddAdmin);

  }

  close(): void {
    this.showAddAdmin = false;
    this.closeModal.emit();
  }
}
