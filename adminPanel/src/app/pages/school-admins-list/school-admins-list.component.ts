import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

interface SchoolAdmin {
  id: number;
  name: string;
  title: string;
  profilePic: string;
}

@Component({
    selector: 'app-school-admins-list',
    templateUrl: './school-admins-list.component.html',
    styleUrl: './school-admins-list.component.css',
    standalone: false
})
export class SchoolAdminsListComponent implements OnInit, OnDestroy {
  schoolAdministrators: any[] = [];
  private openModalSubscription: Subscription | undefined;
  private usersSubscription: Subscription | undefined; // Add this line

  // Horizontal Bar Chart Data
  public horizontalBarChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Cafe Users', 'Non-Cafe Students', 'Remaining'],
    datasets: [
      {
        data: [60, 35, 5], // Example percentages (sum should be 100)
        label: 'Student Demographics (%)',
        backgroundColor: ['#2196F3', '#2196F3', '#2196F3'], // Example colors
        barThickness: 10,
      },
    ],
  };

  // Horizontal Bar Chart Options
  public horizontalBarChartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y', // Make it a horizontal bar chart
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return value + '%';
          },
        },
      },
      y: {
        ...({
          categoryPercentage: 0.9, // Increase to make bars thicker (less gap between categories)
          barPercentage: 0.95, // Increase to make bars wider (less gap within category)
        } as any),
      },
    },
    elements: {
      bar: {
        borderRadius: 5, // Add border radius for smoother bars
      },
    },
    plugins: {
      legend: { display: true, position: 'bottom' },
      datalabels: {
        anchor: 'end',
        align: 'right',
        formatter: Math.round,
        color: 'black',
        font: {
          weight: 'bold',
        },
      },
    } as any,
  };
  constructor(
    private modalService: ModalService,
    private dashboardService: DashboardService,
    private authService: AuthService,
    private ngZone: NgZone,
    private snackBar: MatSnackBar,
        private dialog: MatDialog

  ) {}

  ngOnInit(): void {
    this.getUsers(); // Call this method

    // this.schoolAdministrators = [
    //   { id: 1, name: 'Ivy Stone', title: 'Cafe Manager', profilePic: 'profile1.png' },
    //   { id: 2, name: 'Jack Green', title: 'Assistant Manager', profilePic: 'profile1.png' },
    //   { id: 3, name: 'Kelly Blue', title: 'Barista Lead', profilePic: 'profile1.png' }
    // ];
  }

  openAddAdminCard(): void {
    this.modalService.openAddAdmin();
    this.getUsers();
  }

  closeAddAdminCard(): void {
    // this.showAddAdminCard = false;
  }

  editAdmin(admin: any): void {
    console.log('Edit admin:', admin);
    this.modalService.openEditProfile(admin);
    this.getUsers();
    // Implement your edit functionality here
  }
  getUsers(): void {
    this.usersSubscription = this.dashboardService._users.subscribe(
      (users: any) => {
        if(users.allUsers && users.allUsers.length > 0) {
          this.schoolAdministrators = users.allUsers.filter(
            (user: any) => user.userType === 'school'
          );
        }

        this.ngZone.run(() => {});
      }
    );
    this.dashboardService.getUsers();
  }

  removeAdmin(admin: any): void {
    // Implement your remove functionality here

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Removal',
        message: `Are you sure you want to remove the admin: ${
          admin.username || admin.email
        }? This action cannot be undone.`,
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
      },
    });
    // User cancelled, do nothing or log it
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed, proceed with removal
        this.authService.removeUser(admin._id);
        this.getUsers()
      } else {
        // User cancelled, do nothing or log it
        console.log('Admin removal cancelled');
      }
    });

    this.getUsers();
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
