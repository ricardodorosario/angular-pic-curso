import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  @ViewChild('usernameInput', { static: true })
  usernameInput!: ElementRef<HTMLInputElement>;
  fromUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.fromUrl = params.fromUrl;
    });
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.platformDetectorService.isPlatformBrowser() &&
      this.usernameInput.nativeElement.focus();
  }
  login() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.authenticate(username, password).subscribe(
      (success) => {
        console.log('Success: ', success);
        if (this.fromUrl) {
          this.router.navigateByUrl(this.fromUrl);
        } else {
          this.router.navigate(['user', username]);
        }
      },
      (error) => {
        console.log('Error: ', error);
        this.platformDetectorService.isPlatformBrowser() &&
          this.usernameInput.nativeElement.focus();
        this.loginForm.reset();
      }
    );
  }
}
