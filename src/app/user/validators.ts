import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emailFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const trimmedValue = control.value ? control.value.trim() : null;
    const valid = trimmedValue ? emailPattern.test(trimmedValue) : false;
    return valid ? null : { invalidEmailFormat: true };
  };
}

