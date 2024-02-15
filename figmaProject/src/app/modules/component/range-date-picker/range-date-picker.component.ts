import { Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss']
})
export class RangeDatePickerComponent{

  range = new FormGroup({
  start: new FormControl(),
  end: new FormControl(),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
