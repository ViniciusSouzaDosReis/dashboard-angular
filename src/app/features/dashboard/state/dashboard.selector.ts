import { IAppState } from '../../../core/state/app.state';

export const dashboardSelector = (state: IAppState) => ({
  data: state.dashboard.data,
  status: state.dashboard.status,
});
