import { map, Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import {
  PlanMetrics,
  Plan,
  CreatePlanRequest,
} from '../../../core/models/plan.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(private api: ApiService) {}

  getPlans(): Observable<Plan[]> {
    return this.api.handleMock<Plan[]>(this.generateMockPlans(50));
  }

  createPlan(plan: CreatePlanRequest): Observable<Plan> {
    return this.api.post<Plan>('plans', plan);
  }

  editPlan(plan: Plan): Observable<Plan> {
    return this.api.put<Plan>(`plans/${plan.id}`, plan);
  }

  deletePlan(planId: string): Observable<void> {
    return this.api.delete<void>(`plans/${planId}`);
  }

  getPlansMetrics(): Observable<PlanMetrics[]> {
    // return this.api.get<PlanMetrics[]>('plans/metrics').pipe(
    //   map((plans) =>
    //     plans.map((plan) => ({
    //       ...plan,
    //       percentage: Math.round(plan.percentage),
    //     }))
    //   )
    // );
    return this.api.handleMock<PlanMetrics[]>(this.generateMockPlanMetrics(5));
  }

  generateMockPlans(count = 3) {
    const mockPlans = [];

    for (let i = 1; i <= count; i++) {
      mockPlans.push({
        id: i.toString(),
        nome: `Plano ${i}`,
        preco: Math.floor(Math.random() * 100) + 50,
        franquiaDados: Math.floor(Math.random() * 10) + 5,
        minutosLigacao: Math.floor(Math.random() * 200) + 100,
        dataCadastro: '2025-01-01',
      });
    }

    return mockPlans;
  }

  generateMockPlanMetrics(count = 3) {
    const mockPlans: PlanMetrics[] = [];

    for (let i = 1; i <= count; i++) {
      mockPlans.push({
        id: i.toString(),
        name: `Plano ${i}`,
        percentage: Math.random() * 100,
        totalUsersInPlan: Math.floor(Math.random() * 100),
        associations: [
          {
            clientId: Math.floor(Math.random() * 100).toString(),
            associationDate: `2025-01-01`,
          },
        ],
      });
    }

    return mockPlans;
  }
}
