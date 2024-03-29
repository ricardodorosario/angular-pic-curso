import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UserNotTakenValidatorService],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  @ViewChild('inputEmail', { static: true })
  inputEmail!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignupService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          lowerCaseValidator,
          //Validators.pattern(/^[a-z0-9_\-]+$/),
        ],
        [this.userNotTakenValidatorService.checkUserNameTaken()],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ],
      ],
    });
    this.platformDetectorService.isPlatformBrowser() &&
      this.inputEmail.nativeElement.focus();
  }

  signUp() {
    const newUser = this.signUpForm.getRawValue() as NewUser;
    this.signupService.signUp(newUser).subscribe(
      () => {
        this.router.navigate(['']);
      },
      (err) => {
        console.log('Erro: ', err);
      }
    );
  }
}
