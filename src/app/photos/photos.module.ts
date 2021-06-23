import { NgModule } from '@angular/core';
import { PhotoModule } from './photo/photo.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoDetailModule } from './photo-detail/photo-detail.module';

@NgModule({
  declarations: [],
  //exports: [PhotoComponent],
  imports: [PhotoModule, PhotoFormModule, PhotoListModule, PhotoDetailModule],
})
export class PhotosModule {}
