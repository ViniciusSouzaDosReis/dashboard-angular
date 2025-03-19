import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Plan } from '../../../../core/models/plan.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../core/state/app.state';
import { PlanActions } from '../../state/plans.actions';
import { plansSelector } from '../../state/plans.selector';
import { StateStatus } from '../../../../core/models/state.model';

@Component({
  selector: 'app-edit-plan-modal',
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
  templateUrl: './edit-plan-modal.component.html',
})
export class EditPlanModalComponent {
  @Input({ required: true }) displayModal = false;
  @Input({ required: true }) plan!: Plan;
  @Output() displayModalChange = new EventEmitter<boolean>();

  editPlanForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {
    this.editPlanForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      dataAllowance: ['', Validators.required],
      callMinutes: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.editPlanForm.patchValue(this.plan);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['plan'] && changes['plan'].currentValue) {
      this.editPlanForm.patchValue({
        name: this.plan.nome,
        price: this.plan.preco,
        dataAllowance: this.plan.franquiaDados,
        callMinutes: this.plan.minutosLigacao,
      });
    }
  }

  onHide() {
    this.editPlanForm.reset();
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
  }

  onSubmit() {
    if (this.editPlanForm.valid) {
      this.store.dispatch(
        PlanActions.editPlan({
          plan: { ...this.editPlanForm.value, id: this.plan.id },
        })
      );

      this.store.select(plansSelector).subscribe(({ plans }) => {
        if (plans.status === StateStatus.success) {
          this.onHide();
        }
      });
    }
  }
}
