import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from './users.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
  constructor(
    @Inject(Actions) private actions$: Actions,
    private usersService: UsersService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.createUser),
      mergeMap(({ user }) =>
        this.usersService.createUser(user).pipe(
          map((response) => UsersActions.createUserSuccess({ user: response })),
          catchError((error) => of(UsersActions.createUserFailure({ error })))
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.editUser),
      mergeMap(({ user }) =>
        this.usersService.editUser(user).pipe(
          map((response) => UsersActions.editUserSuccess({ user: response })),
          catchError((error) => of(UsersActions.editUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap(({ userId }) =>
        this.usersService.deleteUser(userId).pipe(
          map(() => UsersActions.deleteUserSuccess({ userId })),
          catchError((error) => of(UsersActions.deleteUserFailure({ error })))
        )
      )
    )
  );
}
