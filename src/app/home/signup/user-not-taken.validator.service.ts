import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';
import { SignupService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {
  constructor(private signupService: SignupService) {}

  checkUserNameTaken() {
    return (control: AbstractControl) => {
      return control.valueChanges
        .pipe(debounceTime(300))
        .pipe(
          switchMap((userName) => {
            return this.signupService.checkUserNameTaken(userName);
          })
        )
        .pipe(map((isTaken) => (isTaken ? { usernametaken: true } : null)))
        .pipe(first());
    };
  }
}
