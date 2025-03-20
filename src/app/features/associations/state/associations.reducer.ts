import { createReducer, on } from '@ngrx/store';
import { PlanAssociation } from '../../../core/models/plan.model';
import { AssociationsActions } from './associations.actions';

export interface IAssociationState {
  data: PlanAssociation[] | null;
}
const initialState: IAssociationState = {
  data: null,
};

export const associationsReducer = createReducer(
  initialState,
  on(AssociationsActions.setAssociations, (state, { associations }) => {
    return {
      ...state,
      data: associations,
    };
  }),

  on(AssociationsActions.updateAssociations, (state, { associations }) => {
    const updatedAssociations = state.data
      ? state.data.map((association) => {
          const updatedAssociation = associations.find(
            (a) => a.id === association.id
          );
          return updatedAssociation ? updatedAssociation : association;
        })
      : [];

    return {
      ...state,
      data: updatedAssociations,
    };
  })
);
