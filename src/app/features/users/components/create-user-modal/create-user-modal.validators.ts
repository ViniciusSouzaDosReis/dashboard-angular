import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;

    if (!cpf) {
      return null;
    }

    const cleanedCpf = cpf.replace(/\D/g, '');

    if (cleanedCpf.length !== 11) {
      return { cpfInvalid: true };
    }

    return null;
  };
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phone = control.value;

    if (!phone) {
      return null;
    }

    const cleanedPhone = phone.replace(/\D/g, '');

    if (cleanedPhone.length !== 11) {
      return { phoneInvalid: true };
    }

    return null;
  };
}
