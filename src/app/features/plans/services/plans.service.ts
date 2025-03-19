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
    return this.api.get<Plan[]>('plans');
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
    return this.api.get<PlanMetrics[]>('plans/metrics').pipe(
      map((plans) =>
        plans.map((plan) => ({
          ...plan,
          percentage: Math.round(plan.percentage),
        }))
      )
    );
  }
}
