import { IAppState } from '../../../core/state/app.state';

export const plansSelector = (state: IAppState) => ({
  plansMetrics: {
    data: state.plansMetrics.data,
    status: state.plansMetrics.status,
  },
  plans: {
    data: state.plans.data,
    status: state.plans.status,
  },
});
