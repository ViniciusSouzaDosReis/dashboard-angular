import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './app.state';
import { usersReducer } from '../../features/users/state/users.reducer';
import { dashboardReducer } from '../../features/dashboard/state/dashboard.reducer';
import {
  planMetricsReducer,
  plansReducer,
} from '../../features/plans/state/plans.reducer';

export const appReducers: ActionReducerMap<IAppState> = {
  users: usersReducer,
  plans: plansReducer,
  dashboard: dashboardReducer,
  plansMetrics: planMetricsReducer,
};
