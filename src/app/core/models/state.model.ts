export enum StateStatus {
  loading = 'loading',
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export interface StateModel<T> {
  data: T;
  status: StateStatus;
  error: any;
}
