import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit, OnChanges {
  @Input() photos: Photo[] = [];
  rows: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photos) {
      this.rows = this.groupColumns();
    }
  }

  groupColumns(): any[] {
    const newRows: any[] = [];

    for (let index = 0; index < this.photos.length; index += 3) {
      newRows.push(this.photos.slice(index, index + 3));
    }

    return newRows;
  }
}
