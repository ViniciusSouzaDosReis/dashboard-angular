import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChartModule } from 'primeng/chart';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { Subscription } from 'rxjs';
import { Dashboard } from '../../core/models/dashboard.model';
import { IAppState } from '../../core/state/app.state';
import { Store } from '@ngrx/store';
import { DashboardActions } from './state/dashboard.actions';
import { dashboardSelector } from './state/dashboard.selector';
import { SkeletonModule } from 'primeng/skeleton';
import { PlanMetrics } from '../../core/models/plan.model';
import { PlanMetricActions } from '../plans/state/plans.actions';
import { plansSelector } from '../plans/state/plans.selector';
import { User } from '../../core/models/user.model';
import { UsersActions } from '../users/state/users.actions';
import { usersSelector } from '../users/state/users.selectors';
import { PlansChartComponent } from './components/plans-chart/plans-chart.component';
import { UsersChartComponent } from './components/users-chart/users-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    ChartModule,
    SplitButtonModule,
    MenuModule,
    MetricCardComponent,
    SkeletonModule,
    PlansChartComponent,
    UsersChartComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptionDashboard!: Subscription;
  dashboard: Dashboard | null = null;
  isLoadingDashboard = true;

  private subscriptionPlans!: Subscription;
  planOptions: PlanMetrics[] | null = null;
  selectedPlans: PlanMetrics[] | null = null;
  isLoadingPlans = true;

  private subscriptionUsers!: Subscription;
  users: User[] | null = null;
  isLoadingUsers = true;
  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(DashboardActions.loadDashboard());
    this.subscriptionDashboard = this.store
      .select(dashboardSelector)
      .subscribe(({ data, status }) => {
        this.dashboard = data;
        this.isLoadingDashboard = status === 'loading';
      });

    this.store.dispatch(PlanMetricActions.loadPlansMetrics());
    this.subscriptionPlans = this.store
      .select(plansSelector)
      .subscribe(({ plansMetrics }) => {
        const { data, status } = plansMetrics;
        this.planOptions = data;
        this.selectedPlans = data;
        this.isLoadingPlans = status === 'loading';
      });

    this.store.dispatch(UsersActions.loadUsers());
    this.subscriptionUsers = this.store
      .select(usersSelector)
      .subscribe(({ data, status }) => {
        this.users = data;
        this.isLoadingUsers = status === 'loading';
      });
  }

  ngOnDestroy() {
    this.subscriptionDashboard.unsubscribe();
    this.subscriptionPlans.unsubscribe();
    this.subscriptionUsers.unsubscribe();
  }
}
