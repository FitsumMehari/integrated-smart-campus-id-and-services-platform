import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';

interface DashboardCard {
  title: string;
  icon: string;
  count: number;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  cards: DashboardCard[] = [
    { title: 'Admins', icon: 'supervisor_account', count: 0, route: 'admins' },
    { title: 'Students', icon: 'school', count: 0, route: 'admins' },
    { title: 'Notices', icon: 'notifications', count: 0, route: 'admins' },
    { title: 'Messages', icon: 'email', count: 0, route: 'admins' },
  ];

  admins: any[] = []; // Changed to arrays
  students: any[] = []; // Changed to arrays
  allUsers: any[] = []; // Changed to array
  allNotices: any[] = [];
  allMessages: any[] = [];

  private usersSubscription: Subscription | undefined;
  private noticesSubscription: Subscription | undefined;
  private messagesSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dashboardService: DashboardService
  ) {
    this.matIconRegistry.addSvgIcon(
      'smart_id_logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/smart_id_logo.svg'
      )
    );
  }

  ngOnInit(): void {
    this.initDashboardCards();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.unsubscribeSubscriptions();
  }

  initDashboardCards(): void {
    this.cards.forEach((card) => (card.count = 0));
  }

  fetchData(): void {
    this.dashboardService.getUsers();
    this.dashboardService.getNotices();
    this.dashboardService.getMessages();
    this.subscribeToData();
  }

  subscribeToData(): void {
    this.usersSubscription = this.dashboardService._users.subscribe((next) => {
      this.admins = []; // Clear existing data
      this.students = [];
      if (next.allUsers) {
        this.allUsers = next.allUsers; // Corrected: Assign the new array
        // Clear existing data

        if (this.allUsers) {
          //check if it is not null or undefined
          this.allUsers.forEach((user: any) => {
            if (user.userType === 'student') {
              this.students.push(user);
            } else if (user.userType !== 'guest') {
              this.admins.push(user);
            }
          });
        }
        this.cards[0].count = this.admins.length;
        this.cards[1].count = this.students.length;
      }
    });

    this.noticesSubscription = this.dashboardService._notices.subscribe(
      (next) => {
        if (next.notices !== undefined) {
          this.allNotices = next.notices;
          this.cards[2].count = this.allNotices.length;
        }
      }
    );

    this.messagesSubscription = this.dashboardService._messages.subscribe(
      (next) => {
        if (next.messages !== undefined) {
          this.allMessages = next.messages;
          this.cards[3].count = this.allMessages.length;
        }
      }
    );
  }

  unsubscribeSubscriptions(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
    if (this.noticesSubscription) {
      this.noticesSubscription.unsubscribe();
    }
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
}
