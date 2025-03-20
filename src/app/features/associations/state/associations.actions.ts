import { createAction, props } from '@ngrx/store';
import { PlanAssociation } from '../../../core/models/plan.model';

const setAssociations = createAction(
  '[Associations] Set Associations',
  props<{ associations: PlanAssociation[] }>()
);

const updateAssociations = createAction(
  '[Associations] Update Association',
  props<{ associations: PlanAssociation[] }>()
);

const getAssociations = createAction('[Associations] Get Associations');

export const AssociationsActions = {
  setAssociations,
  updateAssociations,
  getAssociations,
};
