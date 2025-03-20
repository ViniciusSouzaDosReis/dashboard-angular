import { IAppState } from '../../../core/state/app.state';

export const associationSelector = (state: IAppState) => ({
  data: state.associations.data,
});
