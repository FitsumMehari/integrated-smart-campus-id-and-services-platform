import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';

interface DashboardCard {
  title: string;
  icon: string;
  count: number;
  route: string;
}

@Component({
    selector: 'app-registrar',
    templateUrl: './registrar.component.html',
    styleUrl: './registrar.component.css',
    standalone: false
})
export class RegistrarComponent implements OnInit, OnDestroy {
  cards: DashboardCard[] = [];

  account: any = {};
  admins: any[] = []; // Changed to arrays
  students: any[] = []; // Changed to arrays
  allUsers: any[] = []; // Changed to array
  allNotices: any[] = [];
  allMessages: any[] = [];
  notices: any = [];
  messages: any = [];
  private usersSubscription: Subscription | undefined;
  private noticesSubscription: Subscription | undefined;
  private messagesSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {
    // Register custom icons if needed
    this.matIconRegistry.addSvgIcon(
      'smart_id_logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/smart_id_logo.svg'
      ) // Replace with your actual path
    );
  }

  ngOnInit(): void {
    this.setAccount();
    if (this.account.userType === 'registrar') {
      this.cards = [
        { title: 'Students', icon: 'school', count: 0, route: 'students' },
        { title: 'Notices', icon: 'notifications', count: 0, route: 'notices' },
        { title: 'Messages', icon: 'email', count: 0, route: 'messages' },
      ];
    } else {
      this.cards = [
        {
          title: 'Admins',
          icon: 'supervisor_account',
          count: 0,
          route: 'admins',
        },
        { title: 'Students', icon: 'school', count: 0, route: 'students' },
        { title: 'Notices', icon: 'notifications', count: 0, route: 'notices' },
        { title: 'Messages', icon: 'email', count: 0, route: 'messages' },
      ];
    }
    // In a real application, you would fetch these counts from your backend API
    this.initDashboardCards();
    this.fetchData();
  }
  setAccount() {
    this.account = this.authService.getLoggedInUserDetails();
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
      this.allUsers = next.allUsers; // Corrected: Assign the new array
      this.admins = []; // Clear existing data
      this.students = []; // Clear existing data
      this.notices = []; // Clear existing data
      this.messages = []; // Clear existing data

      if (this.allUsers) {
        //check if it is not null or undefined
        this.allUsers.forEach((user: any) => {
          if (user.userType === 'student') {
            this.students.push(user);
          } else if (user.userType == 'registrar') {
            this.admins.push(user);
          }
        });
      }
      if (this.account.userType !== 'registrar') {
        this.cards[0].count = this.admins.length;
      }
      if (this.account.userType !== 'registrar') {
        this.cards[1].count = this.students.length;
      } else {
        this.cards[0].count = this.students.length;
      }
    });

    this.noticesSubscription = this.dashboardService._notices.subscribe(
      (next) => {
        this.notices = []; // Clear existing data
        this.allNotices = next.notices;
        if (this.allNotices) {
          //check if it is not null or undefined
          this.allNotices.forEach((notice: any) => {
            if (notice.category === 'registrar') {
              this.notices.push(notice);
            }
          });
        }
        if (this.account.userType !== 'registrar') {
          this.cards[2].count = this.notices.length;
        } else {
          this.cards[1].count = this.notices.length;
        }
      }
    );

    this.messagesSubscription = this.dashboardService._messages.subscribe(
      (next) => {
        this.messages = []; // Clear existing data
        this.allMessages = next.messages;
        if (this.allMessages) {
          //check if it is not null or undefined
          this.allMessages.forEach((message: any) => {
            if (message.category === 'registrar') {
              this.messages.push(message);
            }
          });
        }
        if (this.account.userType !== 'registrar') {
          this.cards[3].count = this.messages.length;
        } else {
          this.cards[2].count = this.messages.length;
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

  ngOnDestroy(): void {
    this.unsubscribeSubscriptions();
  }
}
