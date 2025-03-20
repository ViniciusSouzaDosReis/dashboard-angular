import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AssociationsActions } from './associations.actions';
import { PlanActions } from '../../plans/state/plans.actions';
import { mergeMap } from 'rxjs';
import { PlanAssociation } from '../../../core/models/plan.model';

@Injectable()
export class AssociationsEffects {
  constructor(@Inject(Actions) private actions$: Actions) {}

  setAssociations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.loadPlansSuccess),
      mergeMap(({ plans }) => {
        const associations: PlanAssociation[] = plans.map(({ id, nome }) => ({
          id,
          name: nome,
          items: [],
        }));

        return [AssociationsActions.setAssociations({ associations })];
      })
    )
  );
}
