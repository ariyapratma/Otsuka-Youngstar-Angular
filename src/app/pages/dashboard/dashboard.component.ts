import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
} from 'ng-apexcharts';
import { Title } from '@angular/platform-browser';

export interface User {
  id: number;
  title: string;
  category_id: number;
  description: string;
  progress: number;
}

export interface ApexchartInterface {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userData: User[] = [];
  chartOptions!: ApexchartInterface;

  constructor(
    private restApiService: ApiServiceService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.titleService.setTitle('Otsuka Youngstar - Dashboard');
  }

  private getEmployees() {
    this.restApiService.getUser().subscribe(
      (data) => {
        this.userData = data.data;
        this.showChart();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  private showChart() {
    this.chartOptions = {
      series: [
        {
          name: 'User Progress',
          data: this.userData.map((user) => user.progress),
        },
      ],
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: this.userData.map((user) => user.title),
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: 'User Progress (%)',
        },
      },
    };
  }
}
