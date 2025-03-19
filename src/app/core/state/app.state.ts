import { IDashboardState } from '../../features/dashboard/state/dashboard.reducer';
import {
  IPlanMetricsState,
  IPlansState,
} from '../../features/plans/state/plans.reducer';
import { IUserState } from '../../features/users/state/users.reducer';
import { StateStatus } from '../models/state.model';

export interface IAppState {
  users: IUserState;
  dashboard: IDashboardState;
  plans: IPlansState;
  plansMetrics: IPlanMetricsState;
}

export const initialState: IAppState = {
  users: {
    data: null,
    status: StateStatus.loading,
    error: null,
  },

  dashboard: {
    data: null,
    status: StateStatus.loading,
    error: null,
  },

  plansMetrics: {
    data: null,
    status: StateStatus.loading,
    error: null,
  },

  plans: {
    data: null,
    status: StateStatus.loading,
    error: null,
  },
};
