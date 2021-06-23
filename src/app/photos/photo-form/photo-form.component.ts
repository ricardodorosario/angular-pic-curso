import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss'],
})
export class PhotoFormComponent implements OnInit {
  photoForm!: FormGroup;
  file: File | undefined;
  preview: string = '';
  percentDone: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alert: AlertService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  upload() {
    const description = this.photoForm.get('description')?.value;
    const allowComments = this.photoForm.get('allowComments')?.value;
    console.log(description, allowComments, this.file);
    if (this.file) {
      this.photoService
        .upload(description, allowComments, this.file)
        .subscribe((event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(
              (100 * event.loaded) / (event.total || 1)
            );
          } else if (event.type === HttpEventType.Response) {
            this.alert.success('Photo uploaded successfully!', true);
            this.router.navigate(['/user', this.userService.getUserName()]);
          }
        });
    }
  }

  handleFile(event: Event) {
    this.file = <File>(<HTMLInputElement>event.target).files?.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => (this.preview = event.target?.result);
    reader.readAsDataURL(this.file);
  }
}
