import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlansService } from '../services/plans.service';
import { PlanActions, PlanMetricActions } from './plans.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AssociationsActions } from '../../associations/state/associations.actions';

@Injectable()
export class PlansEffects {
  constructor(
    @Inject(Actions) private actions$: Actions,
    private plansService: PlansService
  ) {}

  loadPlansMetrics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanMetricActions.loadPlansMetrics),
      mergeMap(() =>
        this.plansService.getPlansMetrics().pipe(
          map((plans) => PlanMetricActions.loadPlansMetricsSuccess({ plans })),
          catchError((error) =>
            of(PlanMetricActions.loadPlansMetricsFailure({ error }))
          )
        )
      )
    )
  );

  loadPlans$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.loadPlans),
      mergeMap(() =>
        this.plansService.getPlans().pipe(
          map((plans) => PlanActions.loadPlansSuccess({ plans })),
          catchError((error) => of(PlanActions.loadPlansFailure({ error })))
        )
      )
    )
  );

  createPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.createPlan),
      mergeMap(({ plan }) =>
        this.plansService.createPlan(plan).pipe(
          map((plan) => PlanActions.createPlanSuccess({ plan })),
          catchError((error) => of(PlanActions.createPlanFailure({ error })))
        )
      )
    )
  );

  editPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.editPlan),
      mergeMap(({ plan }) =>
        this.plansService.editPlan(plan).pipe(
          map((plan) => PlanActions.editPlanSuccess({ plan })),
          catchError((error) => of(PlanActions.editPlanFailure({ error })))
        )
      )
    )
  );

  deletePlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.deletePlan),
      mergeMap(({ planId }) =>
        this.plansService.deletePlan(planId).pipe(
          map(() => PlanActions.deletePlanSuccess({ planId })),
          catchError((error) => of(PlanActions.deletePlanFailure({ error })))
        )
      )
    )
  );
}
