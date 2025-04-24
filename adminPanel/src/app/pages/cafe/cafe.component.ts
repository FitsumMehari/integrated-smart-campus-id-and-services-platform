import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface DashboardCard {
  title: string;
  icon: string;
  count: number;
  route: string;
}

@Component({
  selector: 'app-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.css']
})
export class CafeComponent implements OnInit {
  cards: DashboardCard[] = [
    { title: 'Admins', icon: 'supervisor_account', count: 0, route: 'admins' },
    { title: 'Students', icon: 'school', count: 0, route: 'students' },
    { title: 'Notices', icon: 'notifications', count: 0, route: 'notices' },
    { title: 'Messages', icon: 'email', count: 0, route: 'messages' }
  ];

  constructor(private router: Router, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    // Register custom icons if needed
    this.matIconRegistry.addSvgIcon(
      'smart_id_logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/smart_id_logo.svg') // Replace with your actual path
    );
  }

  ngOnInit(): void {
    // In a real application, you would fetch these counts from your backend API
    this.cards[0].count = 150;
    this.cards[1].count = 5;
    this.cards[2].count = 20;
    this.cards[3].count = 35;
  }


}
