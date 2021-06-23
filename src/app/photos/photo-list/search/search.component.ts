import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() onTyping = new EventEmitter<string>();
  @Input() value: string = '';
  debounce: Subject<string> = new Subject<string>();

  constructor() {}

  ngOnInit(): void {
    this.debounce.pipe(debounceTime(1000)).subscribe((filter) => {
      this.onTyping.emit(filter);
    });
  }
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
  keyUp(target: any) {
    this.debounce.next(target.value);
  }
}
