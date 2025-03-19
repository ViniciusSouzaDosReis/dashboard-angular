import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../core/models/user.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UsersActions } from './state/users.actions';
import { usersSelector } from './state/users.selectors';
import { IAppState } from '../../core/state/app.state';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersTableComponent, SkeletonModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  users: User[] | null = null;
  isLoading = true;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
    this.subscription = this.store
      .select(usersSelector)
      .subscribe(({ data, status }) => {
        this.users = data;
        this.isLoading = status === 'loading';
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
