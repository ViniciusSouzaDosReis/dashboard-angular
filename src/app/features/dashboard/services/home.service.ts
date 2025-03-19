import { Injectable } from '@angular/core';
import { Dashboard } from '../../../core/models/dashboard.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apiService: ApiService) {}

  getDashboard() {
    return this.apiService.get<Dashboard>('dashboard');
  }
}
