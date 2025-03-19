import { createAction, props } from '@ngrx/store';
import {
  CreatePlanRequest,
  Plan,
  PlanAssociation,
  PlanMetrics,
} from '../../../core/models/plan.model';

const loadPlansMetrics = createAction('[PlansMetrics] Load PlansMetrics');

const loadPlansMetricsSuccess = createAction(
  '[PlansMetrics] Load PlansMetrics Success',
  props<{ plans: PlanMetrics[] }>()
);

const loadPlansMetricsFailure = createAction(
  '[PlansMetrics] Load PlansMetrics Failure',
  props<{ error: any }>()
);

const loadPlans = createAction('[Plans] Load Plans');

const loadPlansSuccess = createAction(
  '[Plans] Load Plans Success',
  props<{ plans: Plan[] }>()
);

const loadPlansFailure = createAction(
  '[Plans] Load Plans Failure',
  props<{ error: any }>()
);

const editPlans = createAction(
  '[Plans] Edit Plans',
  props<{ plans: PlanAssociation[] }>()
);

const createPlan = createAction(
  '[Plans] Create Plan',
  props<{ plan: CreatePlanRequest }>()
);

const createPlanSuccess = createAction(
  '[Plans] Create Plan Success',
  props<{ plan: Plan }>()
);

const createPlanFailure = createAction(
  '[Plans] Create Plan Failure',
  props<{ error: any }>()
);

const editPlan = createAction('[Plans] Edit Plan', props<{ plan: Plan }>());

const editPlanSuccess = createAction(
  '[Plans] Edit Plan Success',
  props<{ plan: Plan }>()
);

const editPlanFailure = createAction(
  '[Plans] Edit Plan Failure',
  props<{ error: any }>()
);

const deletePlan = createAction(
  '[Plans] Delete Plan',
  props<{ planId: string }>()
);

const deletePlanSuccess = createAction(
  '[Plans] Delete Plan Success',
  props<{ planId: string }>()
);

const deletePlanFailure = createAction(
  '[Plans] Delete Plan Failure',
  props<{ error: any }>()
);

export const PlanMetricActions = {
  loadPlansMetrics,
  loadPlansMetricsSuccess,
  loadPlansMetricsFailure,
};

export const PlanActions = {
  loadPlans,
  loadPlansSuccess,
  loadPlansFailure,
  createPlan,
  createPlanSuccess,
  createPlanFailure,
  editPlan,
  editPlanSuccess,
  editPlanFailure,
  deletePlan,
  deletePlanSuccess,
  deletePlanFailure,
  editPlans,
};
