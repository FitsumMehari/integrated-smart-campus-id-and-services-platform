import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';

interface CafeAdmin {
  id: number;
  name: string;
  title: string;
  profilePic: string;
}

@Component({
  selector: 'app-cafe-admins-list',
  templateUrl: './cafe-admins-list.component.html',
  styleUrls: ['./cafe-admins-list.component.css']
})
export class CafeAdminsListComponent implements OnInit, OnDestroy {
  cafeAdministrators: CafeAdmin[] = [];
  private openModalSubscription: Subscription | undefined;

  // Horizontal Bar Chart Data
  public horizontalBarChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Cafe Users', 'Non-Cafe Students', 'Remaining' ],
    datasets: [
      {
        data: [ 60, 35, 5 ], // Example percentages (sum should be 100)
        label: 'Student Demographics (%)',
        backgroundColor: ['#2196F3', '#2196F3', '#2196F3'], // Example colors
        barThickness: 10,
      }
    ]
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
        callback: function(value) {
          return value + '%';
        }
      }
    },
    y: {
      ...(({
        categoryPercentage: 0.9, // Increase to make bars thicker (less gap between categories)
        barPercentage: 0.95,    // Increase to make bars wider (less gap within category)
      }) as any)
    }
  },
  elements: {
    bar: {
      borderRadius: 5, // Add border radius for smoother bars
    }
  },
  plugins: {
    legend: { display: true, position: 'bottom' },
    datalabels: {
      anchor: 'end',
      align: 'right',
      formatter: Math.round,
      color: 'black',
      font: {
        weight: 'bold'
      }
    }
  } as any
};
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.cafeAdministrators = [
      { id: 1, name: 'Ivy Stone', title: 'Cafe Manager', profilePic: 'profile1.png' },
      { id: 2, name: 'Jack Green', title: 'Assistant Manager', profilePic: 'profile1.png' },
      { id: 3, name: 'Kelly Blue', title: 'Barista Lead', profilePic: 'profile1.png' }
    ];
  }

  openAddAdminCard(): void {
    this.modalService.openAddAdmin();
  }

  closeAddAdminCard(): void {
    // this.showAddAdminCard = false;
  }

   editAdmin(admin: CafeAdmin): void {
    console.log('Edit admin:', admin);
    // Implement your edit functionality here
  }

  removeAdmin(admin: CafeAdmin): void {
    console.log('Remove admin:', admin);
    // Implement your remove functionality here
  }

  ngOnDestroy(): void {
    if (this.openModalSubscription) {
      this.openModalSubscription.unsubscribe();
    }
  }
}
