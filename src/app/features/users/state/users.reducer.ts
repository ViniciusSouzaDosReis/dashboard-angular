import { createReducer, on } from '@ngrx/store';
import { UsersActions } from './users.actions';
import { User } from '../../../core/models/user.model';
import { StateModel, StateStatus } from '../../../core/models/state.model';

export interface IUserState extends StateModel<User[] | null> {}

const initialState: IUserState = {
  data: null,
  status: StateStatus.pending,
  error: null,
};

export const usersReducer = createReducer(
  initialState,

  on(UsersActions.loadUsers, (state) => {
    return {
      ...state,
      status: StateStatus.loading,
    };
  }),

  on(UsersActions.loadUsersSuccess, (state, { users }) => {
    return {
      ...state,
      data: users,
      status: StateStatus.success,
    };
  }),

  on(UsersActions.loadUsersFailure, (state, { error }) => {
    return {
      ...state,
      error,
      status: StateStatus.error,
    };
  }),

  on(UsersActions.createUser, (state) => {
    return {
      ...state,
      status: StateStatus.loading,
    };
  }),

  on(UsersActions.createUserSuccess, (state, { user }) => {
    return {
      ...state,
      data: state.data ? [...state.data, user] : [user],
      status: StateStatus.success,
    };
  }),

  on(UsersActions.createUserFailure, (state, { error }) => {
    return {
      ...state,
      error,
      status: StateStatus.error,
    };
  }),

  on(UsersActions.editUser, (state) => {
    return {
      ...state,
      status: StateStatus.loading,
    };
  }),

  on(UsersActions.editUserSuccess, (state, { user }) => {
    return {
      ...state,
      data: state.data
        ? state.data.map((u) => (u.userId === user.userId ? user : u))
        : null,
      status: StateStatus.success,
    };
  }),

  on(UsersActions.editUserFailure, (state, { error }) => {
    return {
      ...state,
      error,
      status: StateStatus.error,
    };
  }),

  on(UsersActions.deleteUser, (state) => {
    return {
      ...state,
      status: StateStatus.loading,
    };
  }),

  on(UsersActions.deleteUserSuccess, (state, { userId }) => {
    return {
      ...state,
      data: state.data ? state.data.filter((u) => u.userId !== userId) : null,
      status: StateStatus.success,
    };
  }),

  on(UsersActions.deleteUserFailure, (state, { error }) => {
    return {
      ...state,
      error,
      status: StateStatus.error,
    };
  })
);
