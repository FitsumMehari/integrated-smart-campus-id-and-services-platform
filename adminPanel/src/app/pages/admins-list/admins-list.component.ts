import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

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
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit {
  administrators: Admin[] = [];
  monthlyActivities: MonthlyActivity[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Admin Activities',
        barThickness: 10, // Set bar thickness here
        // You can also use maxBarThickness if you prefer
        // maxBarThickness: 20,
      },
    ],
    
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'x', // Ensure bars are vertical
  };

  constructor() { }

  ngOnInit(): void {
    this.administrators = [
      { id: 1, name: 'Alice Smith', title: 'Super Admin', role: 'Admin', profilePic: 'profile1.png' },
      { id: 2, name: 'Bob Johnson', title: 'System Admin', role: 'School', profilePic: 'profile1.png' },
      { id: 3, name: 'Charlie Brown', title: 'Data Admin', role: 'Registrar', profilePic: 'profile1.png' },
      { id: 4, name: 'Diana Lee', title: 'Security Admin', role: 'Admin', profilePic: 'profile1.png' },
      { id: 5, name: 'Ethan Williams', title: 'Network Admin', role: 'Cafe', profilePic: 'profile1.png' }
    ];

    this.monthlyActivities = [
      { month: 'Jan', activityCount: 120 },
      { month: 'Feb', activityCount: 150 },
      { month: 'Mar', activityCount: 180 },
      { month: 'Apr', activityCount: 160 },
      { month: 'May', activityCount: 190 },
      { month: 'Jun', activityCount: 170 },
      { month: 'Jul', activityCount: 200 },
      { month: 'Aug', activityCount: 185 },
      { month: 'Sep', activityCount: 165 },
      { month: 'Oct', activityCount: 195 },
      { month: 'Nov', activityCount: 175 },
      { month: 'Dec', activityCount: 210 }
    ];

    this.populateChartData();
  }

  populateChartData(): void {
    this.barChartData.labels = this.monthlyActivities.map(activity => activity.month);
    this.barChartData.datasets[0].data = this.monthlyActivities.map(activity => activity.activityCount);
  }
}
