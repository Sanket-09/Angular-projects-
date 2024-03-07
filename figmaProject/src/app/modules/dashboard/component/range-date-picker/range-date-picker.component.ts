import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { MatSelectChange } from '@angular/material/select'

import { FilterService } from '../../../shared/services/filter.service'
import { json } from 'body-parser'
import { JsonPipe } from '@angular/common'
import * as moment from 'moment'
import { Subscription, buffer } from 'rxjs'

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss'],
})
export class RangeDatePickerComponent {
  @Output() selectedValuesChange: EventEmitter<string> =
    new EventEmitter<string>()

  selectedValues: any
  emittedVisitType: any
  bufferArray: any
  transformedArray: any

  private subscription: Subscription

  handleDateFilterChange(event: any) {}

  handleVisitFilterDataChange(event: any, action: string) {
    if (action === 'remove') {
      this.bufferArray = this.speciality.value

      this.bufferArray = this.bufferArray.filter((value: any) => value != event)

      this.speciality.setValue(this.bufferArray)
    }

    this.transformedArray = event.value.map((value: any, index: any) => ({
      key: index,
      value,
    }))

    console.log(this.speciality.value)
  }

  onChipMethodCalled(chipEmitList: any) {
    this.handleVisitFilterDataChange(chipEmitList, 'remove')

    this.cdRef.detectChanges()
  }

  // logObjectProperties(obj: any){
  //   if (typeof obj === 'object' && obj !== null) {
  //     console.log("Received object:");
  //     Object.keys(obj).forEach((key) => {
  //       console.log(`${key}:`, obj[key]);

  //       if(typeof obj[key] === 'string')
  //       this.selectedValues.push(obj[key])
  //     });

  //     console.log(this.selectedValues  +  "    this is the selected value ");
  //     this.submitVisit();
  //   }
  // }

  handleFilterDataChange($event: MatSelectChange) {}

  handleStatusFilterDataChange($event: MatSelectChange) {
    this.FilterService.emitFilter($event.value)
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  })

  range1 = new FormGroup({
    start1: new FormControl(),
    end1: new FormControl(),
  })

  preferredDateChange() {
    const parsedValue = JSON.parse(JSON.stringify(this.range.value))
    console.log(this.range.value)
    const startValue = moment(parsedValue.start).format('YYYY-MM-DD')
    const endValue = moment(parsedValue.end).format('YYYY-MM-DD')

    this.FilterService.emitFilterPrefDate(startValue, endValue)
  }

  requestedDateChange() {
    const parsedValue1 = JSON.parse(JSON.stringify(this.range1.value))
    const startValue1 = moment(parsedValue1.start1).format('YYYY-MM-DD')
    const endValue1 = moment(parsedValue1.end1).format('YYYY-MM-DD')

    this.FilterService.emitFilterReqDate(startValue1, endValue1)
  }

  showFilterOptions: boolean = false

  showFilter() {
    this.showFilterOptions = !this.showFilterOptions
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    private FilterService: FilterService
  ) {
    this.subscription = this.FilterService.chipMethodCalled$.subscribe(
      (chipEmitList: any) => {
        this.onChipMethodCalled(chipEmitList)
      }
    )
  }

  ngOnInit(): void {}

  speciality = new FormControl()
  // specs: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  specs1: any = [
    { key: 1, value: 'General Medicine' },
    { key: 2, value: 'Cardiology' },
    { key: 3, value: 'Pediatrics' },
    { key: 4, value: 'Oncologist' },
    { key: 5, value: 'Endocrinologist' },
    { key: 6, value: 'Neurology' },
    { key: 7, value: 'Radiology' },
  ]

  status: any = [
    { key: 1, value: 'Pending' },
    { key: 2, value: 'Resolved' },
    { key: 3, value: 'Closed' },
  ]

  physicianVisitType: any = [
    { key: 1, value: 'Escalation' },
    { key: 2, value: 'Compliance' },
    { key: 3, value: 'Other Appointments' },
  ]

  physicianCategory: any = [
    { key: 1, value: 'Hospital Visit' },
    { key: 2, value: 'Tele-consulation' },
    { key: 3, value: 'Home Visit' },
  ]

  submitVisit() {
    // Get the checked values and set them to the input field\

    this.FilterService.emitFilterVisit(this.transformedArray)
    // ...
  }

  cancel() {
    // Reset the checked values to empty
    this.speciality.setValue([])
  }
}
