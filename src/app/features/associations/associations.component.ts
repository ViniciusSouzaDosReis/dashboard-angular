import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollerModule } from 'primeng/scroller';
import { SkeletonModule } from 'primeng/skeleton';
import { DragDropModule } from 'primeng/dragdrop';
import { DataViewModule } from 'primeng/dataview';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CreateAssociationModalComponent } from './components/create-association-modal/create-association-modal.component';
import { Store } from '@ngrx/store';
import { IAppState } from '../../core/state/app.state';
import { Subscription } from 'rxjs';
import { Plan, PlanAssociation } from '../../core/models/plan.model';
import { plansSelector } from '../plans/state/plans.selector';
import { PlanActions } from '../plans/state/plans.actions';
import { User } from '../../core/models/user.model';
import { usersSelector } from '../users/state/users.selectors';
import { UsersActions } from '../users/state/users.actions';

type AuxItems = {
  planId: string;
  userId: string;
  items: User[];
};

@Component({
  selector: 'app-associations',
  standalone: true,
  imports: [
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ScrollerModule,
    SkeletonModule,
    DragDropModule,
    DataViewModule,
    AccordionModule,
    DividerModule,
    ButtonModule,
    CreateAssociationModalComponent,
  ],
  templateUrl: './associations.component.html',
})
export class AssociationsComponent {
  private plansSubscription!: Subscription;
  private usersSubscription!: Subscription;

  usersData: User[] | null = null;
  users: User[] | null = null;
  draggedItem: User | null = null;
  isUsersLoading = true;
  selectedUser: User | null = null;

  plansData: Plan[] | null = null;
  plans: PlanAssociation[] | null = null;
  isPlansLoading = true;
  auxItems: AuxItems[] = [];

  constructor(private store: Store<IAppState>) {}
  createAssociationDisplayModal = false;

  ngOnInit(): void {
    this.getPlans();
    this.getUsers();
  }

  getUsers() {
    this.usersSubscription = this.store
      .select(usersSelector)
      .subscribe(({ data, status }) => {
        this.isUsersLoading = status === 'loading';

        if (data !== null) {
          this.users = data;
          this.usersData = data;
        }

        if (!data && status !== 'loading') {
          this.store.dispatch(UsersActions.loadUsers());
        }
      });
  }

  getPlans() {
    this.plansSubscription = this.store
      .select(plansSelector)
      .subscribe(({ plans }) => {
        const { data, status } = plans;

        this.isPlansLoading = status === 'loading';

        if (data !== null) {
          this.plansData = data;
          this.plans = data.map(({ id, nome }) => ({
            name: nome,
            id,
            items: [],
          }));
        }

        if (!data && status !== 'loading') {
          this.store.dispatch(PlanActions.loadPlans());
        }
      });
  }

  handleSearchUser(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;

    if (searchValue === '') {
      this.users = this.usersData;
      return;
    }

    if (this.usersData) {
      this.users = this.usersData.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }

  handleSearchPlan(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;

    if (!this.plansData || !this.plans) {
      return;
    }

    const oldPlans = this.plans;
    if (searchValue === '') {
      this.plans = this.plansData.map(({ id, nome }) => {
        const items = this.auxItems
          .filter((item) => item.planId === id)
          .flatMap((item) => item.items)
          .filter(
            (item, index, self) =>
              self.findIndex((i) => i.userId === item.userId) === index
          );

        return {
          name: nome,
          id,
          items,
        };
      });
      return;
    }

    if (this.plansData) {
      this.auxItems = oldPlans
        .filter((plan) => plan.items.length > 0)
        .flatMap((plan) => {
          return plan.items.map((item) => {
            return { planId: plan.id, userId: item.userId, items: plan.items };
          });
        });

      this.plans = this.plansData
        .filter((plan) =>
          plan.nome.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map(({ id, nome }) => ({
          name: nome,
          id,
          items: oldPlans.find((plan) => plan.id === id)?.items || [],
        }));
    }
  }

  dragStart(item: User) {
    this.draggedItem = item;
  }

  dragEnd() {
    this.draggedItem = null;
  }

  drop(plan: PlanAssociation) {
    if (this.draggedItem) {
      const userAlreadyInPlan = plan.items.find(
        (item) => item.userId === this.draggedItem?.userId
      );
      if (userAlreadyInPlan) {
        this.draggedItem = null;
        return;
      }

      if (this.plansData && this.plans) {
        const planIndex = this.plans.findIndex((p) => p.id === plan.id);
        this.plans[planIndex].items.push(this.draggedItem);

        if (this.auxItems.length > 0) {
          const auxItemIndex = this.auxItems.findIndex(
            (item) => item.userId === this.draggedItem?.userId
          );
          if (auxItemIndex !== -1) {
            this.auxItems[auxItemIndex].items = this.plans[planIndex].items;
          } else {
            this.auxItems.push({
              planId: plan.id,
              userId: this.draggedItem.userId,
              items: this.plans[planIndex].items,
            });
          }
        } else {
          this.auxItems.push({
            planId: plan.id,
            userId: this.draggedItem.userId,
            items: this.plans[planIndex].items,
          });
        }
      }

      this.draggedItem = null;
    }
  }

  removeItem(plan: PlanAssociation, item: User) {
    if (this.plansData && this.plans) {
      const planIndex = this.plans.findIndex((p) => p.id === plan.id);
      const itemIndex = this.plans[planIndex].items.findIndex(
        (i) => i.userId === item.userId
      );

      this.plans[planIndex].items.splice(itemIndex, 1);
    }
  }

  openCreateAssociationModal(user: User) {
    this.selectedUser = user;
    this.createAssociationDisplayModal = true;
  }

  ngOnDestroy(): void {
    this.plansSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }
}
