import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { IAppState } from '../../../../core/state/app.state';
import { InputNumberModule } from 'primeng/inputnumber';
import { PlanActions } from '../../state/plans.actions';
import { plansSelector } from '../../state/plans.selector';
import { StateStatus } from '../../../../core/models/state.model';

@Component({
  selector: 'app-create-plan-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DragDropModule,
    InputMaskModule,
    ToastModule,
    InputNumberModule,
  ],
  templateUrl: './create-plan-modal.component.html',
})
export class CreatePlanModalComponent {
  @Input({ required: true }) displayModal = false;
  @Output() displayModalChange = new EventEmitter<boolean>();

  newPlanForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {
    this.newPlanForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      dataAllowance: ['', Validators.required],
      callMinutes: ['', Validators.required],
    });
  }

  onHide() {
    this.newPlanForm.reset();
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
  }

  onSubmit() {
    if (this.newPlanForm.valid) {
      this.store.dispatch(
        PlanActions.createPlan({ plan: this.newPlanForm.value })
      );

      this.store.select(plansSelector).subscribe(({ plans }) => {
        if (plans.status === StateStatus.success) {
          this.onHide();
        }
      });
    }
  }
}
