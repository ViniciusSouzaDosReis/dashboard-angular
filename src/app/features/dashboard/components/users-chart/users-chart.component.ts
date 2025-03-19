import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { PlanMetrics } from '../../../../core/models/plan.model';
import { ChartOptions } from 'chart.js';
import { MONTHS } from '../../../../shared/constants/months';
import { SpinLoadingBlurComponent } from '../../../../shared/components/spin-loading-blur/spin-loading-blur.component';

@Component({
  selector: 'app-users-chart',
  standalone: true,
  imports: [
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    SkeletonModule,
    ChartModule,
    SpinLoadingBlurComponent,
  ],
  templateUrl: './users-chart.component.html',
})
export class UsersChartComponent implements OnInit {
  @Input({ required: true }) data: User[] = [];
  @Input({ required: true }) isLoading = false;

  users: User[] = [];

  months = MONTHS;
  monthsOptions = [
    { label: 'Último mes', value: 'last-month' },
    { label: 'Últimos 6 meses', value: 'last-six-month' },
    { label: 'Último 1 ano', value: 'last-year' },
  ];
  selectedMonth = '';

  chartData: any;
  chartOptions: ChartOptions = {};
  isLoadingChart = false;

  constructor() {}

  ngOnInit(): void {
    this.users = this.data;

    this.updateChartData();

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          stacked: true,
          ticks: {
            stepSize: 5,
          },
          grid: {
            color: '#3f3f46',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      elements: {
        bar: {
          borderRadius: 8,
          borderWidth: 0,
        },
      },

      datasets: {
        bar: {
          barPercentage: 0.7,
          categoryPercentage: 0.7,
        },
      },
    };
  }

  handleMonthChange(): void {
    this.users = this.data.filter((user) => {
      const date = new Date(user.registrationDate);

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      const monthDiff =
        (currentYear - date.getFullYear()) * 12 +
        (currentMonth - date.getMonth());

      switch (this.selectedMonth) {
        case 'last-month':
          this.months = MONTHS.filter(
            (month) => month.value === currentMonth - 1
          );
          return (
            date.getMonth() === currentMonth - 1 &&
            date.getFullYear() === currentYear
          );

        case 'last-six-month':
          this.months = MONTHS.filter(
            (month) => month.value <= currentMonth + 1
          );
          return monthDiff <= 6 && monthDiff >= 0;

        case 'last-year':
          this.months = MONTHS;
          return true;

        default:
          return true;
      }
    });

    this.updateChartData();
  }

  getMonthLabel(monthValue: string): string {
    return (
      this.monthsOptions.find((month) => month.value === monthValue)?.label ||
      ''
    );
  }

  private updateChartData(): void {
    this.isLoadingChart = true;
    console.log('this.data', this.data);

    setTimeout(() => {
      this.isLoadingChart = false;

      this.chartData = {
        labels: MONTHS.map((month) => month.label),
        datasets: [
          {
            type: 'bar',
            backgroundColor: '#2563eb',
            data: MONTHS.map((month) => {
              return this.users.filter(
                (user) =>
                  new Date(user.registrationDate).getMonth() + 1 === month.value
              ).length;
            }),
          },
        ],
      };
    }, 500);
  }
}
