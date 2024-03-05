import { COMMA, ENTER } from '@angular/cdk/keycodes'
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { MatChipInputEvent } from '@angular/material/chips'
import { FilterService } from '../../../shared/services/filter.service'

export interface Fruit {
  name: string
}

interface chipVisit {
  key1: number
  value: string
}

interface chipVisitEmit {
  key1: number
  value: string
}

@Component({
  selector: 'app-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss'],
})
export class FilterChipsComponent implements OnInit {
  clearList() {
    this.showClearButton = false
    this.fruits = []
  }

  dataChip: any

  constructor(private filterService: FilterService) {
    this.filterService.filterChangedSpeciality$.subscribe((speciality) => {
      this.updateFruits(speciality)
    })

    this.filterService.filterChangedCategory$.subscribe((category) => {
      this.updateFruits(category)
    })

    this.filterService.filterChangedVisit$.subscribe((visitType) => {
      this.updateFruits(visitType)
    })
  }

  updateFruits(speciality: any): void {
    this.showClearButton = true
    this.fruits = []
    this.chipVisit = []
    speciality.forEach((obj: { [x: string]: string }) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'string') {
          this.fruits.push({ name: obj[key] })

          if (
            obj[key] == 'Escalation' ||
            obj[key] == 'Compliance' ||
            obj[key] == 'Other Appointments'
          ) {
            this.chipVisit.push({ key1: 1, value: obj[key] })
          }

          if (
            obj[key] == 'Hospital Visit' ||
            obj[key] == 'Tele-consultation' ||
            obj[key] == 'Home Visit'
          ) {
            this.chipSpeciality.push({ key1: 1, value: obj[key] })
          }
        }
      })
    })
  }

  ngOnInit(): void {}

  @Input() selectedValues: string[] = []

  addOnBlur = true
  readonly separatorKeysCodes = [ENTER, COMMA] as const

  fruits: Fruit[] = []

  showClearButton: boolean = false

  chipVisit: chipVisit[] = []
  chipVisitEmit: chipVisitEmit[] = []

  chipSpeciality: chipVisit[] = []
  chipSpecialityEmit: chipVisitEmit[] = []
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
    console.log('the lenght of the array is  ', this.fruits.length)
    if (this.fruits.length <= 1) this.showClearButton = false

    console.log('chip removed called')
    console.log(this.showClearButton)

    const currentItemDelete = fruit.name
    console.log('item deleted is :  ', currentItemDelete)
    const index = this.fruits.indexOf(fruit)

    if (index >= 0) {
      this.fruits.splice(index, 1)

      this.chipVisitEmit = this.chipVisit.filter(
        (item) => item.value !== currentItemDelete
      )

      const emitSpeciality: string[] = this.chipVisit.map((item) => item.value)

      console.log(
        'the emitted chiplist is :  ',
        this.chipVisitEmit + '   and its type is  : ',
        typeof this.chipVisitEmit
      )
      this.filterService.emitFilterVisit(this.chipVisitEmit)
      this.filterService.chipCallMethod(this.chipVisitEmit) // i think this is redundant
    }
  }
}
