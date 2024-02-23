import { COMMA, ENTER } from '@angular/cdk/keycodes'
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { MatChipInputEvent } from '@angular/material/chips'
import { FilterService } from '../../services/filter.service'

export interface Fruit {
  name: string
}

interface chipSpeciality {
  key1: number
  value: string
}

interface chipSpecialityEmit {
  key1: number
  value: string
}

@Component({
  selector: 'app-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss'],
})
export class FilterChipsComponent implements OnInit {
  dataChip: any

  constructor(private filterService: FilterService) {
    this.filterService.filterChangedSpeciality$.subscribe((speciality) => {
      this.updateFruits(speciality)
    })
  }

  updateFruits(speciality: any): void {
    this.fruits = []
    this.chipSpeciality = []
    speciality.forEach((obj: { [x: string]: string }) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'string') {
          this.fruits.push({ name: obj[key] })
          this.chipSpeciality.push({ key1: 1, value: obj[key] })
        }
      })
    })
  }

  ngOnInit(): void {}

  @Input() selectedValues: string[] = []

  addOnBlur = true
  readonly separatorKeysCodes = [ENTER, COMMA] as const

  fruits: Fruit[] = []
  chipSpeciality: chipSpeciality[] = []
  chipSpecialityEmit: chipSpecialityEmit[] = []
  // add(event: MatChipInputEvent): void {
  //   console.log(this.selectedValues + "   in input")
  //   const value = (event.value || '').trim();

  //   // Add our fruit
  //   if (value) {
  //     this.fruits.push({name: value});
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();
  // }

  remove(fruit: Fruit): void {
    console.log('chip removed called')

    const currentItemDelete = fruit.name
    console.log('item deleted is :  ', currentItemDelete)
    const index = this.fruits.indexOf(fruit)

    if (index >= 0) {
      this.fruits.splice(index, 1)

      this.chipSpecialityEmit = this.chipSpeciality.filter(
        (item) => item.value !== currentItemDelete
      )
      console.log(this.chipSpecialityEmit)
      this.filterService.emitFilterSpeciality(this.chipSpecialityEmit)
      this.filterService.chipCallMethod(this.chipSpecialityEmit)
    }
  }
}
