import { createAction, props } from '@ngrx/store';
import {
  CreateUserRequest,
  EditUserRequest,
  User,
} from '../../../core/models/user.model';

const loadUsers = createAction('[Users] Load Users');
const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);
const loadUsersFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

const createUser = createAction(
  '[Users] Create User',
  props<{ user: CreateUserRequest }>()
);
const createUserSuccess = createAction(
  '[Users] Create User Success',
  props<{ user: User }>()
);
const createUserFailure = createAction(
  '[Users] Create User Failure',
  props<{ error: any }>()
);

const editUser = createAction(
  '[Users] Edit User',
  props<{ user: EditUserRequest }>()
);
const editUserSuccess = createAction(
  '[Users] Edit User Success',
  props<{ user: User }>()
);
const editUserFailure = createAction(
  '[Users] Edit User Failure',
  props<{ error: any }>()
);

const deleteUser = createAction(
  '[Users] Delete User',
  props<{ userId: string }>()
);
const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ userId: string }>()
);
const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: any }>()
);

export const UsersActions = {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
  editUser,
  editUserSuccess,
  editUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
};
