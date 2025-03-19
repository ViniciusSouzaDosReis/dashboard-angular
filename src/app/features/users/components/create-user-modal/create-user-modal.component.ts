import {
  Component,
  EventEmitter,
  Inject,
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
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from 'primeng/dragdrop';
import { InputMaskModule } from 'primeng/inputmask';
import { cpfValidator, phoneValidator } from './create-user-modal.validators';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../core/state/app.state';
import { UsersActions } from '../../state/users.actions';
import { ToastModule } from 'primeng/toast';
import { StateStatus } from '../../../../core/models/state.model';
import { usersSelector } from '../../state/users.selectors';

@Component({
  selector: 'app-create-user-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DragDropModule,
    InputMaskModule,
    ToastModule,
  ],
  templateUrl: './create-user-modal.component.html',
})
export class CreateUserModalComponent {
  @Input({ required: true }) displayModal = false;
  @Output() displayModalChange = new EventEmitter<boolean>();

  newUserForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, cpfValidator()]],
      phone: ['', [Validators.required, phoneValidator()]],
    });
  }

  onHide() {
    this.newUserForm.reset();
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
  }

  onSubmit() {
    if (this.newUserForm.valid) {
      this.store.dispatch(
        UsersActions.createUser({ user: this.newUserForm.value })
      );

      this.store.select(usersSelector).subscribe(({ status }) => {
        if (status === StateStatus.success) {
          this.onHide();
        }
      });
    }
  }
}
