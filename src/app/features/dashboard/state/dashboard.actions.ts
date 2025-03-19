import { createAction, props } from '@ngrx/store';
import { Dashboard } from '../../../core/models/dashboard.model';

const loadDashboard = createAction('[Dashboard] Load Dashboards');

const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboards Success',
  props<{ dashboard: Dashboard }>()
);

const loadDashboardFailure = createAction(
  '[Dashboard] Load Dashboards Failure',
  props<{ error: any }>()
);

export const DashboardActions = {
  loadDashboard,
  loadDashboardSuccess,
  loadDashboardFailure,
};
