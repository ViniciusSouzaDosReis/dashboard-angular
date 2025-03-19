import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Plan } from '../../../../core/models/plan.model';
import { CreatePlanModalComponent } from '../create-plan-modal/create-plan-modal.component';
import { EditPlanModalComponent } from '../edit-plan-modal/edit-plan-modal.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../core/state/app.state';
import { PlanActions } from '../../state/plans.actions';
import { plansSelector } from '../../state/plans.selector';
import { StateStatus } from '../../../../core/models/state.model';

@Component({
  selector: 'app-plans-table',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    PaginatorModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    CreatePlanModalComponent,
    EditPlanModalComponent,
  ],
  templateUrl: './plans-table.component.html',
})
export class PlansTableComponent {
  @Input({ required: true }) data: Plan[] = [];

  plans: Plan[] = [];
  plan: Plan | null = null;

  // table config
  paginatorConfig = {
    first: 0,
    rows: 15,
    totalRecords: 0,
  };

  // modals
  createPlanDisplayModal = false;
  editPlanDisplayModal = false;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.plans = this.data;
  }

  handleSearchPlans(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;

    if (!searchValue) {
      this.plans = this.data;
      return;
    }

    this.plans = this.data.filter((plan) => {
      const searchNumber = Number(searchValue);
      return (
        plan.nome.toLowerCase().includes(searchValue.toLowerCase()) ||
        plan.preco === searchNumber
      );
    });
  }

  handleOpenCreatePlanModal(): void {
    this.createPlanDisplayModal = true;
  }

  handleDeletePlan(planId: string) {
    this.store.dispatch(PlanActions.deletePlan({ planId }));

    this.store.select(plansSelector).subscribe(({ plans }) => {
      const { status, data } = plans;

      if (status === StateStatus.success && data) {
        this.plans = data;
      }
    });
  }

  handleOpenEditPlanModal(planId: string) {
    const findPlan = this.plans.find((plan) => plan.id === planId) || null;
    if (!findPlan) {
      return;
    }
    this.plan = findPlan;
    this.editPlanDisplayModal = true;
  }
}
