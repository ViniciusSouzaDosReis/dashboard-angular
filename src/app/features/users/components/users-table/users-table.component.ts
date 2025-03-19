import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { EditUserRequest, User } from '../../../../core/models/user.model';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../core/state/app.state';
import { UsersActions } from '../../state/users.actions';
import { usersSelector } from '../../state/users.selectors';
import { StateStatus } from '../../../../core/models/state.model';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    PaginatorModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    CreateUserModalComponent,
    EditUserModalComponent,
  ],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  @Input({ required: true }) data: User[] = [];

  user: EditUserRequest | null = null;
  users: User[] = [];

  // table config
  paginatorConfig = {
    first: 0,
    rows: 15,
    totalRecords: 0,
  };

  // modals
  createUserDisplayModal = false;
  editUserDisplayModal = false;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.users = this.data;
  }

  handleOpenCreateUserModal() {
    this.createUserDisplayModal = true;
  }

  handleOpenEditUserModal(userId: string) {
    const findUser = this.users.find((user) => user.userId === userId) || null;
    if (!findUser) {
      return;
    }
    this.user = {
      userId: findUser.userId,
      name: findUser.name,
      cpf: findUser.cpf,
      phone: findUser.phone,
      email: findUser.email,
    };
    this.editUserDisplayModal = true;
  }

  onPageChange(event: any): void {
    this.paginatorConfig.first = event.first;
    this.paginatorConfig.rows = event.rows;
  }

  handleDeleteUser(userId: string) {
    this.store.dispatch(UsersActions.deleteUser({ userId }));

    this.store.select(usersSelector).subscribe(({ data, status }) => {
      if (status === StateStatus.success && data) {
        this.users = data;
      }
    });
  }

  handleSearchUser(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;

    if (!searchValue) {
      this.users = this.data;
      return;
    }

    this.users = this.data.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.cpf.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }
}
