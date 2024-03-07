import { COMMA, ENTER } from '@angular/cdk/keycodes'
import {
  ChangeDetectorRef,
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
    this.filterService.emitFilterCategory([])
    this.filterService.emitFilterSpeciality([])
    this.filterService.emitFilterVisit([])
  }

  constructor(
    private filterService: FilterService,
    private cdr: ChangeDetectorRef
  ) {
    this.filterService.filterChangedSpeciality$.subscribe((speciality) => {
      this.updateList(speciality)
    })

    this.filterService.filterChangedCategory$.subscribe((category) => {
      this.updateList(category)
    })

    this.filterService.filterChangedVisit$.subscribe((visitType) => {
      this.updateList(visitType)
    })
  }

  updateList(list: any) {
    this.updateFruits(list)
  }

  updateFruits(speciality: any): void {
    // this.fruits = []
    // this.chipVisit = []
    // this.chipSpeciality = []
    // this.chipCategory = []

    speciality.forEach((obj: { [x: string]: string }) => {
      Object.keys(obj).forEach((key) => {
        if (
          typeof obj[key] === 'string' &&
          !this.fruits.find((o: any) => o.name == obj[key])
        ) {
          this.fruits.push({ name: obj[key] })

          if (
            obj[key] == 'Escalation' ||
            obj[key] == 'Compliance' ||
            obj[key] == 'Other Appointments'
          ) {
            this.chipVisit.push({ key1: 1, value: obj[key] })
          } else if (
            obj[key] == 'Hospital Visit' ||
            obj[key] == 'Tele-consultation' ||
            obj[key] == 'Home Visit'
          ) {
            this.chipSpeciality.push({ key1: 1, value: obj[key] })
          } else {
            this.chipCategory.push({ key1: 1, value: obj[key] })
          }
        }
      })
    })

    if (this.fruits.length > 4) {
      this.showClearButton = true
    } else this.showClearButton = false
  }

  ngOnInit(): void {}

  @Input() selectedValues: string[] = []

  addOnBlur = true
  readonly separatorKeysCodes = [ENTER, COMMA] as const

  fruits: Fruit[] = []

  showClearButton: boolean = false

  chipVisit: chipVisit[] = []

  chipSpeciality: chipVisit[] = []

  chipCategory: chipVisit[] = []

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

  remove(fruit: any, i: any): void {
    let currentItemDelete = fruit.name
    let index = i

    if (index >= 0) {
      this.fruits.splice(index, 1)

      if (
        currentItemDelete == 'Escalation' ||
        currentItemDelete == 'Compliance' ||
        currentItemDelete == 'Other Appointments'
      ) {
        this.chipVisit = this.chipVisit.filter(
          (item: { value: any }) => item.value !== currentItemDelete
        )
        this.filterService.emitFilterVisit(this.chipVisit)
        this.filterService.chipCallMethod(currentItemDelete)
      } else if (
        currentItemDelete == 'Hospital Visit' ||
        currentItemDelete == 'Home Visit' ||
        currentItemDelete == 'Tele-consultation'
      ) {
        this.chipSpeciality = this.chipSpeciality.filter(
          (item: { value: any }) => item.value !== currentItemDelete
        )
        this.filterService.emitFilterSpeciality(this.chipSpeciality)
        this.filterService.chipCallMethod(currentItemDelete)
      } else {
        this.chipCategory = this.chipCategory.filter(
          (item: { value: any }) => item.value !== currentItemDelete
        )
        this.filterService.emitFilterCategory(this.chipCategory)
        this.filterService.chipCallMethod(currentItemDelete)
      }

      setTimeout(() => {
        this.cdr.detectChanges()
      }, 100)
    }
  }
}
