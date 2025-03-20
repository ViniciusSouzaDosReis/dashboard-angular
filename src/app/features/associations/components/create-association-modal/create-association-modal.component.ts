import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollerModule } from 'primeng/scroller';
import { ButtonModule } from 'primeng/button';
import { PlanAssociation } from '../../../../core/models/plan.model';
import { User } from '../../../../core/models/user.model';
import { SkeletonModule } from 'primeng/skeleton';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../core/state/app.state';
import { AssociationsActions } from '../../state/associations.actions';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-create-association-modal',
  standalone: true,
  imports: [
    DialogModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ScrollerModule,
    ButtonModule,
    SkeletonModule,
    NgClass,
  ],
  templateUrl: './create-association-modal.component.html',
})
export class CreateAssociationModalComponent implements OnInit, OnChanges {
  @Input({ required: true }) displayModal = false;
  @Input({ required: true, alias: 'plans' }) data: PlanAssociation[] = [];
  @Input({ required: true }) user!: User;
  @Output() displayModalChange = new EventEmitter<boolean>();

  selectedPlans: PlanAssociation[] = [];
  plans: PlanAssociation[] = [];

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.plans = this.data;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue) {
      this.plans = this.data;
    }
    if (changes['user'] && changes['user'].currentValue) {
      this.user = this.user;
    }
  }

  onSubmit() {
    const plans: PlanAssociation[] = this.selectedPlans.map((plan) => {
      return {
        ...plan,
        items: [...plan.items, this.user],
      };
    });

    this.store.dispatch(
      AssociationsActions.updateAssociations({ associations: plans })
    );

    this.onHide();
  }

  onHide() {
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
    this.selectedPlans = [];
  }

  handleSearchUser(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.plans = this.data.filter((plan) =>
      plan.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  selectPlan(plan: PlanAssociation) {
    if (this.isAssociating(plan)) return;

    if (this.isSelected(plan)) {
      this.selectedPlans = this.selectedPlans.filter(
        (selectedPlan) => selectedPlan.id !== plan.id
      );
    } else {
      this.selectedPlans.push(plan);
    }
  }

  isSelected(plan: PlanAssociation): boolean {
    return this.selectedPlans.some((item) => item.id === plan.id);
  }

  isAssociating(plan: PlanAssociation): boolean {
    return plan.items.some((item) => item.userId === this.user.userId);
  }
}
