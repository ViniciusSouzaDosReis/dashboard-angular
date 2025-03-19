import { Injectable } from '@angular/core';
import {
  CreateUserRequest,
  EditUserRequest,
  User,
} from '../../../core/models/user.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apiService: ApiService) {}

  getUsers() {
    return this.apiService.get<User[]>('users');
  }

  createUser(user: CreateUserRequest) {
    return this.apiService.post<User>('users', user);
  }

  editUser(user: EditUserRequest) {
    return this.apiService.put<User>(`users/${user.userId}`, user);
  }

  deleteUser(userId: string) {
    return this.apiService.delete(`users/${userId}`);
  }
}
