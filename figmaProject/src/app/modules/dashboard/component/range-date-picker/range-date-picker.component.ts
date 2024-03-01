import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { MatSelectChange } from '@angular/material/select'

import { FilterService } from '../../../services/filter.service'

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss'],
})
export class RangeDatePickerComponent {
  @Output() selectedValuesChange: EventEmitter<string> =
    new EventEmitter<string>()

  selectedValues: string[][] = []
  emittedVisitType: any
  transformedArray: any

  handleVisitFilterDataChange(event: any) {
    this.transformedArray = event.value.map((value: any, index: any) => ({
      key: index,
      value,
    }))
    console.log(this.transformedArray)

    //  if(event.isUserInput)
    //  {

    //   console.log("inside event.userinput")
    //   if(event.selected){
    //     console.log("event selected")

    //   }
    //   else{
    //     console.log("event deselected")
    //     this.selectedValues = this.selectedValues.filter(value => value !== event.value)
    //   }
    //  }
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

  showFilterOptions: boolean = false

  showFilter() {
    this.showFilterOptions = !this.showFilterOptions
    console.log(this.showFilterOptions)
  }

  constructor(private FilterService: FilterService) {}

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
