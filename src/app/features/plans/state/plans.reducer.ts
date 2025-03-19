import { createReducer, on } from '@ngrx/store';
import { Plan, PlanMetrics } from '../../../core/models/plan.model';
import { StateModel, StateStatus } from '../../../core/models/state.model';
import { PlanActions, PlanMetricActions } from './plans.actions';

export interface IPlanMetricsState extends StateModel<PlanMetrics[] | null> {}

export interface IPlansState extends StateModel<Plan[] | null> {}

const initialStatePlansMetrics: IPlanMetricsState = {
  data: null,
  status: StateStatus.pending,
  error: null,
};

export const planMetricsReducer = createReducer(
  initialStatePlansMetrics,
  on(PlanMetricActions.loadPlansMetrics, (state) => {
    return {
      ...state,
      status: StateStatus.loading,
    };
  }),

  on(PlanMetricActions.loadPlansMetricsSuccess, (state, { plans }) => {
    return {
      ...state,
      data: plans,
      status: StateStatus.success,
    };
  }),

  on(PlanMetricActions.loadPlansMetricsFailure, (state, { error }) => {
    return {
      ...state,
      error,
      status: StateStatus.error,
    };
  })
);

const initialStatePlans: IPlansState = {
  data: null,
  status: StateStatus.pending,
  error: null,
};

export const plansReducer = createReducer(
  initialStatePlans,
  on(PlanActions.loadPlans, (state) => {
    return {
      ...state,
      status: StateStatus.loading,
    };
  }),

  on(PlanActions.loadPlansSuccess, (state, { plans }) => {
    return {
      ...state,
      data: plans,
      status: StateStatus.success,
    };
  }),

  on(PlanActions.loadPlansFailure, (state, { error }) => {
    return {
      ...state,
      error,
      status: StateStatus.error,
    };
  }),

  on(PlanActions.createPlan, (state) => {
    return {
      ...state,
      status: StateStatus.loading,
    };
  }),

  on(PlanActions.createPlanSuccess, (state, { plan }) => {
    return {
      ...state,
      data: state.data ? [...state.data, plan] : [plan],
      status: StateStatus.success,
    };
  }),

  on(PlanActions.createPlanFailure, (state, { error }) => {
    return {
      ...state,
      error,
      status: StateStatus.error,
    };
  }),

  on(PlanActions.editPlan, (state) => {
    return {
      ...state,
      status: StateStatus.loading,
    };
  }),

  on(PlanActions.editPlanSuccess, (state, { plan }) => {
    return {
      ...state,
      data: state.data
        ? state.data.map((p) => (p.id === plan.id ? plan : p))
        : [plan],
      status: StateStatus.success,
    };
  }),

  on(PlanActions.editPlanFailure, (state, { error }) => {
    return {
      ...state,
      error,
      status: StateStatus.error,
    };
  }),

  on(PlanActions.deletePlan, (state) => {
    return {
      ...state,
      status: StateStatus.loading,
    };
  }),

  on(PlanActions.deletePlanSuccess, (state, { planId }) => {
    return {
      ...state,
      data: state.data ? state.data.filter((p) => p.id !== planId) : null,
      status: StateStatus.success,
    };
  }),

  on(PlanActions.deletePlanFailure, (state, { error }) => {
    return {
      ...state,
      error,
      status: StateStatus.error,
    };
  }),

  on(PlanActions.editPlans, (state, { plans }) => {
    const updatedPlans = state.data
      ? state.data.map((plan) => {
          const findPlan = plans.find((p) => p.id === plan.id);
          console.log(findPlan);
          const updatedPlan: Plan = {
            ...plan,
            
          };

          return updatedPlan;
        })
      : [];

    console.log(updatedPlans);

    return {
      ...state,
      data: updatedPlans,
      status: StateStatus.loading,
    };
  })
);
