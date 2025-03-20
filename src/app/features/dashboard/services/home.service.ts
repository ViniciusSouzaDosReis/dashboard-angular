import { Injectable } from '@angular/core';
import { Dashboard } from '../../../core/models/dashboard.model';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apiService: ApiService) {}

  getDashboard() {
    return this.apiService.handleMock(this.generateDashboardMock());
  }

  generateDashboardMock(): Dashboard {
    return {
      clients: this.generateRandomMetrics(),
      plans: this.generateRandomMetrics(),
      averagePlansPerClient: {
        total: this.getRandomInt(1, 10),
        lastMonth: this.getRandomInt(1, 10).toString(),
        difference: this.getRandomInt(1, 10),
        percentage: (this.getRandomInt(1, 10) * 10).toFixed(2),
        trend: 'increase',
      },
    };
  }

  generateRandomMetrics() {
    const total = this.getRandomInt(50, 200);
    const lastMonth = this.getRandomInt(10, 200);
    const difference = total - lastMonth;
    const percentage = ((difference / lastMonth) * 100).toFixed(2);
    const trend: 'increase' | 'decrease' =
      difference >= 0 ? 'increase' : 'decrease';

    return {
      total,
      lastMonth,
      difference,
      percentage,
      trend,
    };
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
