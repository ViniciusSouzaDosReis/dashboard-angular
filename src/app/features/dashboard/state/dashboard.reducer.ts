import { createReducer, on } from '@ngrx/store';
import { StateModel, StateStatus } from '../../../core/models/state.model';
import { Dashboard } from '../../../core/models/dashboard.model';
import { DashboardActions } from './dashboard.actions';

export interface IDashboardState extends StateModel<Dashboard | null> {}

const initialState: IDashboardState = {
  data: null,
  status: StateStatus.pending,
  error: null,
};

export const dashboardReducer = createReducer(
  initialState,

  on(DashboardActions.loadDashboard, (state) => {
    return {
      ...state,
      status: StateStatus.loading,
    };
  }),

  on(DashboardActions.loadDashboardSuccess, (state, { dashboard }) => {
    return {
      ...state,
      data: dashboard,
      status: StateStatus.success,
    };
  }),

  on(DashboardActions.loadDashboardFailure, (state, { error }) => {
    return {
      ...state,
      error,
      status: StateStatus.error,
    };
  })
);
