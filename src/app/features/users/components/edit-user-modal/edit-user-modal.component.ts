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
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { StateStatus } from '../../../../core/models/state.model';
import { IAppState } from '../../../../core/state/app.state';
import { UsersActions } from '../../state/users.actions';
import { usersSelector } from '../../state/users.selectors';
import {
  cpfValidator,
  phoneValidator,
} from '../create-user-modal/create-user-modal.validators';
import { EditUserRequest } from '../../../../core/models/user.model';

@Component({
  selector: 'app-edit-user-modal',
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
  templateUrl: './edit-user-modal.component.html',
})
export class EditUserModalComponent implements OnInit, OnChanges {
  @Input({ required: true }) displayModal = false;
  @Input({ required: true }) user!: EditUserRequest;
  @Output() displayModalChange = new EventEmitter<boolean>();

  editUserForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, cpfValidator()]],
      phone: ['', [Validators.required, phoneValidator()]],
    });
  }

  ngOnInit() {
    this.editUserForm.patchValue(this.user);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && changes['user'].currentValue) {
      this.editUserForm.patchValue(changes['user'].currentValue);
    }
  }

  onHide() {
    this.editUserForm.reset();
    this.displayModal = false;
    this.displayModalChange.emit(this.displayModal);
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      this.store.dispatch(
        UsersActions.editUser({
          user: { ...this.editUserForm.value, userId: this.user.userId },
        })
      );

      this.store.select(usersSelector).subscribe(({ status }) => {
        if (status === StateStatus.success) {
          this.onHide();
        }
      });
    }
  }
}
