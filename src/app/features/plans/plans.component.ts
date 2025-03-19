import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { PlansTableComponent } from './components/plans-table/plans-table.component';
import { Subscription } from 'rxjs';
import { Plan } from '../../core/models/plan.model';
import { Store } from '@ngrx/store';
import { IAppState } from '../../core/state/app.state';
import { PlanActions } from './state/plans.actions';
import { plansSelector } from './state/plans.selector';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [SkeletonModule, PlansTableComponent],
  templateUrl: './plans.component.html',
})
export class PlansComponent {
  private subscription!: Subscription;
  plans: Plan[] | null = null;
  isLoading = true;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(plansSelector)
      .subscribe(({ plans }) => {
        const { data, status } = plans;

        this.isLoading = status === 'loading';

        if(data !== null) {
          this.plans = data;
        }

        if (!data && status !== 'loading') {
          this.store.dispatch(PlanActions.loadPlans());
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
