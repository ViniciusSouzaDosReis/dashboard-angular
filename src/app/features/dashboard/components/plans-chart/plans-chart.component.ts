import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { PlanMetrics } from '../../../../core/models/plan.model';
import { isPlatformBrowser } from '@angular/common';
import { SpinLoadingBlurComponent } from "../../../../shared/components/spin-loading-blur/spin-loading-blur.component";

@Component({
  selector: 'app-plans-chart',
  standalone: true,
  imports: [
    MultiSelectModule,
    DropdownModule,
    FormsModule,
    SkeletonModule,
    ChartModule,
    SpinLoadingBlurComponent
],
  templateUrl: './plans-chart.component.html',
})
export class PlansChartComponent implements OnInit {
  @Input({ required: true }) data: PlanMetrics[] = [];
  @Input({ required: true }) isLoading = false;

  plansOptions: PlanMetrics[] = [];
  selectedPlans: PlanMetrics[] = [];

  monthsOptions = [
    { label: 'Último mes', value: 'last-month' },
    { label: 'Últimos 6 meses', value: 'last-six-month' },
    { label: 'Último 1 ano', value: 'last-year' },
  ];
  selectedMonth = '';

  chartColors: Record<string, string> = {};
  chartOptions: ChartOptions = {};
  chartData: any = {};
  isLoadingChart = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.plansOptions = this.data;
    this.selectedPlans = this.data;
    this.chartColors = this.data.reduce((acc, plan) => {
      acc[plan.id] = `--chart-${Object.keys(acc).length + 1}`;
      return acc;
    }, {} as Record<string, string>);
    this.updateChartData();

    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);

      const textColor = documentStyle.getPropertyValue('--text-color');

      this.chartOptions = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      };
    }
  }

  handleMonthChange(): void {
    this.plansOptions = this.data.filter((plan) => {
      const dates = plan.associations.map(
        (association) => new Date(association.associationDate)
      );
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      switch (this.selectedMonth) {
        case 'last-month':
          return dates.some(
            (date) =>
              date.getMonth() === currentMonth &&
              date.getFullYear() === currentYear
          );

        case 'last-six-month':
          return dates.some((date) => {
            const monthDiff =
              (currentYear - date.getFullYear()) * 12 +
              (currentMonth - date.getMonth());
            return monthDiff <= 6 && monthDiff >= 0;
          });

        case 'last-year':
          return dates.some((date) => {
            const monthDiff =
              (currentYear - date.getFullYear()) * 12 +
              (currentMonth - date.getMonth());

            return monthDiff <= 12 && monthDiff >= 0;
          });

        default:
          return true;
      }
    });

    this.updateChartData();
  }

  handlePlanChange(): void {
    this.plansOptions = this.data.filter((plan) =>
      this.selectedPlans.some((planSelected) => planSelected.id === plan.id)
    );

    this.updateChartData();
  }

  getPercentage(plan: PlanMetrics): number {
    const totalUsers = this.plansOptions.reduce(
      (acc, plan) => acc + plan.totalUsersInPlan,
      0
    );

    return (plan.totalUsersInPlan / totalUsers) * 100;
  }

  getMonthLabel(monthValue: string): string {
    return (
      this.monthsOptions.find((month) => month.value === monthValue)?.label ||
      ''
    );
  }

  private updateChartData(): void {
    this.isLoadingChart = true;
    setTimeout(() => {
      this.isLoadingChart = false;

      if (isPlatformBrowser(this.platformId)) {
        const documentStyle = getComputedStyle(document.documentElement);

        this.chartData = {
          responsive: true,
          datasets: [
            {
              data: this.plansOptions.map((plan) => plan.totalUsersInPlan),
              backgroundColor: this.plansOptions.map((plan) =>
                documentStyle.getPropertyValue(this.chartColors[plan.id])
              ),
              borderWidth: 0,
            },
          ],
        };
      }
    }, 500);
  }
}
