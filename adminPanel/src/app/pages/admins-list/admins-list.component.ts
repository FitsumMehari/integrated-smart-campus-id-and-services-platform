// import { Component, OnInit } from '@angular/core';
// import { ChartConfiguration, ChartOptions } from 'chart.js';
// import { DashboardService } from '../../services/dashboard.service';

// interface Admin {
//   id: number;
//   name: string;
//   title: string;
//   role: string;
//   profilePic: string;
// }

// interface MonthlyActivity {
//   month: string;
//   activityCount: number;
// }

// @Component({
//   selector: 'app-admins-list',
//   templateUrl: './admins-list.component.html',
//   styleUrls: ['./admins-list.component.css'],
// })
// export class AdminsListComponent implements OnInit {
//   administrators: Admin[] = [];
//   monthlyActivities: MonthlyActivity[] = [];
//   allActivities: any = [];

//   public barChartData: ChartConfiguration<'bar'>['data'] = {
//     labels: [],
//     datasets: [
//       {
//         data: [],
//         label: 'Admin Activities',
//         barThickness: 10, // Set bar thickness here
//         // You can also use maxBarThickness if you prefer
//         // maxBarThickness: 20,
//       },
//     ],
//   };

//   public barChartOptions: ChartOptions<'bar'> = {
//     responsive: true,
//     indexAxis: 'x', // Ensure bars are vertical
//   };

//   constructor(private dashboardService: DashboardService) {}

//   ngOnInit(): void {
//     this.setActivitiesCount();


//     this.administrators = [
//       {
//         id: 1,
//         name: 'Alice Smith',
//         title: 'Super Admin',
//         role: 'Admin',
//         profilePic: 'profile1.png',
//       },
//       {
//         id: 2,
//         name: 'Bob Johnson',
//         title: 'System Admin',
//         role: 'School',
//         profilePic: 'profile1.png',
//       },
//       {
//         id: 3,
//         name: 'Charlie Brown',
//         title: 'Data Admin',
//         role: 'Registrar',
//         profilePic: 'profile1.png',
//       },
//       {
//         id: 4,
//         name: 'Diana Lee',
//         title: 'Security Admin',
//         role: 'Admin',
//         profilePic: 'profile1.png',
//       },
//       {
//         id: 5,
//         name: 'Ethan Williams',
//         title: 'Network Admin',
//         role: 'Cafe',
//         profilePic: 'profile1.png',
//       },
//     ];

//     this.monthlyActivities = [
//       { month: 'Jan', activityCount: 0 },
//       { month: 'Feb', activityCount: 0 },
//       { month: 'Mar', activityCount: 0 },
//       { month: 'Apr', activityCount: 0 },
//       { month: 'May', activityCount: 0 },
//       { month: 'Jun', activityCount: 0 },
//       { month: 'Jul', activityCount: 0 },
//       { month: 'Aug', activityCount: 0 },
//       { month: 'Sep', activityCount: 0 },
//       { month: 'Oct', activityCount: 0 },
//       { month: 'Nov', activityCount: 0 },
//       { month: 'Dec', activityCount: 0 },
//     ];

//     // this.populateChartData();
//   }

//   populateChartData(): void {
//     this.barChartData.labels = this.monthlyActivities.map(
//       (activity) => activity.month
//     );
//     this.barChartData.datasets[0].data = this.monthlyActivities.map(
//       (activity) => activity.activityCount
//     );
//   }

//   async setActivitiesCount() {
//      this.dashboardService.getActivitiessCount();
//     this.dashboardService._activities.subscribe((next) => {
//       Object.assign(this.allActivities, next.activities);
//       // console.log(this.allActivities);
//       this.allActivities.forEach((activity: any) => {
//         if (activity.createdAt) {
//           // console.log(activity.createdAt.split('-')[1]);
//           this.monthlyActivities[
//             activity.createdAt.split('-')[1] - 1
//           ].activityCount += 1;
//         }
//       });
//       // console.log(this.monthlyActivities);
//       this.populateChartData();

//     });
//     // this.populateChartData();

//   }
// }

//

//

//


import { Component, OnInit, NgZone, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';

interface Admin {
  id: number;
  name: string;
  title: string;
  role: string;
  profilePic: string;
}

interface MonthlyActivity {
  month: string;
  activityCount: number;
}

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css'],
})
export class AdminsListComponent implements OnInit, OnDestroy {
  @ViewChild('myChart') myChartRef: ElementRef | undefined;
  administrators: any = [];
  monthlyActivities: MonthlyActivity[] = [];
  allActivities: any = [];
  chart: Chart | undefined;
  private activitiesSubscription: Subscription | undefined;
  private usersSubscription: Subscription | undefined; // Add this line

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Admin Activities',
        barThickness: 10,
      },
    ],
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'x',
  };

  constructor(
    private dashboardService: DashboardService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.initializeMonthlyActivities();
    this.createChart();
    this.setActivitiesCount();
    this.getUsers(); // Call this method

    // this.administrators = [
    //   { id: 1, name: 'Alice Smith', title: 'Super Admin', role: 'Admin', profilePic: 'profile1.png' },
    //   { id: 2, name: 'Bob Johnson', title: 'System Admin', role: 'School', profilePic: 'profile1.png' },
    //   { id: 3, name: 'Charlie Brown', title: 'Data Admin', role: 'Registrar', profilePic: 'profile1.png' },
    //   { id: 4, name: 'Diana Lee', title: 'Security Admin', role: 'Admin', profilePic: 'profile1.png' },
    //   { id: 5, name: 'Ethan Williams', title: 'Network Admin', role: 'Cafe', profilePic: 'profile1.png' },
    // ];
  }

  ngOnDestroy(): void {
    if (this.activitiesSubscription) {
      this.activitiesSubscription.unsubscribe();
    }
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.usersSubscription) { // Add this
      this.usersSubscription.unsubscribe();
    }
  }

  initializeMonthlyActivities(): void {
    this.monthlyActivities = [
      { month: 'Jan', activityCount: 0 },
      { month: 'Feb', activityCount: 0 },
      { month: 'Mar', activityCount: 0 },
      { month: 'Apr', activityCount: 0 },
      { month: 'May', activityCount: 0 },
      { month: 'Jun', activityCount: 0 },
      { month: 'Jul', activityCount: 0 },
      { month: 'Aug', activityCount: 0 },
      { month: 'Sep', activityCount: 0 },
      { month: 'Oct', activityCount: 0 },
      { month: 'Nov', activityCount: 0 },
      { month: 'Dec', activityCount: 0 },
    ];
  }

  createChart(): void {
    if (this.myChartRef && this.myChartRef.nativeElement) {
      const ctx = this.myChartRef.nativeElement.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: this.barChartData,
        options: this.barChartOptions,
      });
    }
  }

  populateChartData(): void {
    this.barChartData.labels = this.monthlyActivities.map((activity) => activity.month);
    this.barChartData.datasets[0].data = this.monthlyActivities.map((activity) => activity.activityCount);
  }

  updateChart(): void {
    this.populateChartData();
    if (this.chart) {
      this.chart.data = this.barChartData;
      this.chart.update();
    }
  }

  setActivitiesCount() {
    this.activitiesSubscription = this.dashboardService._activities.subscribe((next) => {
      this.allActivities = next.activities;
      this.monthlyActivities.forEach((month) => (month.activityCount = 0));

      if(this.allActivities) {
        this.allActivities.forEach((activity: any) => {
          if (activity.createdAt) {
            this.monthlyActivities[
              activity.createdAt.split('-')[1] - 1
            ].activityCount += 1;
          }
        });
      }
      this.updateChart();
      this.ngZone.run(() => {});
    });
    this.dashboardService.getActivities();
  }

  getUsers(): void {
    this.usersSubscription = this.dashboardService._users.subscribe((users: any) => {
      this.administrators = users.allUsers.filter(
        (user:any) =>
          user.userType === 'cafe' ||
          user.userType === 'gate' ||
          user.userType === 'school' ||
          user.userType === 'admin'
      );
      // console.log(this.administrators);


      this.ngZone.run(() => {});
    });
    this.dashboardService.getUsers();
  }
}



