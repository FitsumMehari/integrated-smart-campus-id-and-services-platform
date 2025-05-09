import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

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
    private snackBar: MatSnackBar
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
  }

  closeAddAdminCard(): void {
    // this.showAddAdminCard = false;
  }

  editAdmin(admin: any): void {
    console.log('Edit admin:', admin);
    this.modalService.openEditProfile(admin);
    // Implement your edit functionality here
  }
  getUsers(): void {
    this.usersSubscription = this.dashboardService._users.subscribe(
      (users: any) => {
        if(users){
          this.schoolAdministrators = users.allUsers.filter(
            (user: any) => user.userType === 'school'
          );
        }
        // console.log(this.administrators);

        this.ngZone.run(() => {});
      }
    );
    this.dashboardService.getUsers();
  }

  removeAdmin(admin: any): void {
    console.log('Remove admin:', admin);
    this.authService.removeUser(admin._id);
    this.authService._response.subscribe((response) => {
      console.log(response);
      if (response && response.message) {
        const config = new MatSnackBarConfig();
        config.verticalPosition = 'top';
        config.duration = 3000;
        this.snackBar.open(response.message, 'Close', config);

        this.getUsers();
      }
    });
    // Implement your remove functionality here
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
