import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardService } from '../services/home.service';
import { DashboardActions } from './dashboard.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      mergeMap(() =>
        this.dashboardService.getDashboard().pipe(
          map((dashboard) =>
            DashboardActions.loadDashboardSuccess({ dashboard })
          ),
          catchError((error) =>
            of(DashboardActions.loadDashboardFailure({ error }))
          )
        )
      )
    )
  );
}
