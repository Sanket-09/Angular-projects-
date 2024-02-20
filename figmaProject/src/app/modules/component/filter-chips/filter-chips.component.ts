import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, Input} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss']
})
export class FilterChipsComponent {

  constructor() { 
    
   }

  @Input() selectedValues : string[] = [];

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{name: 'General Medicine'}, {name: 'Orthopedic'}, {name: 'Oncology'}];

  add(event: MatChipInputEvent): void {
    console.log(this.selectedValues + "   in input")
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

}
