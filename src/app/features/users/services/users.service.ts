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
    // return this.apiService.get<User[]>('users');
    return this.apiService.handleMock<User[]>(this.generateMockUsers(50));
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

  generateMockUsers(count = 3) {
    const mockUsers: User[] = [];

    for (let i = 1; i <= count; i++) {
      const randomMonth = Math.floor(Math.random() * 12) + 1;
      const month = randomMonth < 10 ? `0${randomMonth}` : randomMonth;

      const date = `2025/${month}/1`;

      mockUsers.push({
        userId: i.toString(),
        name: `Usuário ${i}`,
        cpf: '123.456.789-00',
        phone: '(11) 1 1111-1111',
        email: `usuario${i}@usuario.com`,
        registrationDate: date,
        associatedPlans: [
          {
            planId: (Math.floor(Math.random() * 3) + 1).toString(),
            planName: 'Plano Básico',
            associationDate: 'string',
          },
        ],
      });
    }

    return mockUsers;
  }
}
