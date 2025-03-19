import { IAppState } from '../../../core/state/app.state';

export const usersSelector = (state: IAppState) => ({
  data: state.users.data,
  status: state.users.status,
});
