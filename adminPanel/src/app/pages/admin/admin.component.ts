import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../services/modal.service';


interface SideNavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] //  Now referencing CSS
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('profileMenuTrigger') profileMenuTrigger!: MatMenuTrigger;
  @ViewChild('navbar', { static: false, read: ElementRef }) navbar!: ElementRef;
  @ViewChild('sidebar', { static: false, read: ElementRef }) sidebar!: ElementRef;

  isDarkMode = false;
  currentLanguage = 'en';

  sideNavItems: SideNavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Cafe', icon: 'restaurant', route: '/admin/cafe' },
    { label: 'Gate', icon: 'meeting_room', route: '/admin/gate' },
    { label: 'School', icon: 'school', route: '/admin/school' },
    { label: 'Registrar', icon: 'how_to_reg', route: '/admin/registrar' },
  ];

  constructor(public dialog: MatDialog, private renderer: Renderer2, private translateService: TranslateService, public modalService: ModalService) {}


  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'en';
    this.translateService.use(this.currentLanguage);

  }

  ngAfterViewInit() {
    this.setSameBackgroundColor();
  }

  setSameBackgroundColor() {
    const navColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    if (this.navbar && this.sidebar && navColor) {
      this.renderer.setStyle(this.navbar.nativeElement, 'background-color', navColor.trim());
      this.renderer.setStyle(this.sidebar.nativeElement, 'background-color', navColor.trim());
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme');
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    localStorage.setItem('currentLanguage', lang);
    this.translateService.use(this.currentLanguage);
    console.log(`Language changed to ${lang}`);
  }

  openAccountDialog() {
    // this.dialog.open(AccountDialogComponent);
  }

  handleSecondaryAdd(): void {
    console.log('Secondary Add button clicked!');
    // Implement the functionality for this button here
    // For example, you might want to add another field to the form
    // or perform a different action related to adding an admin.
  }


  logout() {
    console.log('Logout clicked');
  }
}
