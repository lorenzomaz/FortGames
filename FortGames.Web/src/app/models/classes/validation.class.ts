import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
//matching control
export class Validation {
  static mustMatch(controlName: string, matchingControlName: string, errorName: string = 'mustMatch'): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlName);
      const matchingControl = controls.get(matchingControlName);

      if (matchingControl?.errors && !matchingControl?.errors[errorName]) {
        return null;
      }

      if (control?.value !== matchingControl?.value) {
        const err: ValidationErrors = { mustMatch: true };
        matchingControl?.setErrors(err);
        return err;
      } else {
        matchingControl?.setErrors(null);
        return null;
      }
    }
  }
}
