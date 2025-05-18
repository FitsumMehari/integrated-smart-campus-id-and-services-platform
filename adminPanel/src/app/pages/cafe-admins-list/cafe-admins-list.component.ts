import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'; // Adjust the path as needed
import { MatDialog } from '@angular/material/dialog';

interface CafeAdmin {
  id: number;
  name: string;
  title: string;
  profilePic: string;
}

@Component({
    selector: 'app-cafe-admins-list',
    templateUrl: './cafe-admins-list.component.html',
    styleUrls: ['./cafe-admins-list.component.css'],
    standalone: false
})
export class CafeAdminsListComponent implements OnInit, OnDestroy {
  cafeAdministrators: any[] = [];
  cafeStudents: any[] = [];
  noncafeStudents: any[] = [];
  otherStudents: any[] = [];

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
  }

  openAddAdminCard(): void {
    this.modalService.openAddAdmin();
    this.getUsers();
  }

  closeAddAdminCard(): void {
    // this.showAddAdminCard = false;
  }

  editAdmin(admin: any): void {
    // console.log('Edit admin:', admin);
    this.modalService.openEditProfile(admin);
    this.getUsers();
    // Implement your edit functionality here
  }
  getUsers(): void {
    this.usersSubscription = this.dashboardService._users.subscribe(
      (users: any) => {
        if (users.allUsers && users.allUsers.length > 0) {
          this.cafeAdministrators = users.allUsers.filter(
            (user: any) => user.userType === 'cafe'
          );
          this.cafeStudents = users.allUsers.filter(
            (user: any) => user.cafeStatus === 'cafe'
          );
          this.noncafeStudents = users.allUsers.filter(
            (user: any) => user.cafeStatus === 'nonCafe'
          );
          this.otherStudents = users.allUsers.filter(
            (user: any) => user.cafeStatus === 'selfsponsored'
          );
          this.horizontalBarChartData.datasets[0].data = [((this.cafeStudents.length)/(this.cafeStudents.length + this.noncafeStudents.length + this.otherStudents.length))*100, ((this.noncafeStudents.length)/(this.cafeStudents.length + this.noncafeStudents.length + this.otherStudents.length))*100, ((this.otherStudents.length)/(this.cafeStudents.length + this.noncafeStudents.length + this.otherStudents.length))*100]
        }
        // console.log(this.administrators);

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
        this.getUsers();
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
