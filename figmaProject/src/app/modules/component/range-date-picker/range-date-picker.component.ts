import {
  Component, ViewEncapsulation
} from '@angular/core';
import {
  FormGroup,
  FormControl
} from '@angular/forms';
import {
  MatSelectChange
} from '@angular/material/select';

@Component({
  selector: 'app-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss'],
 
})
export class RangeDatePickerComponent {
  handleFilterDataChange($event: MatSelectChange) {
    throw new Error('Method not implemented.');
  }
    range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  showFilterOptions: boolean = false;

  showFilter() {
    this.showFilterOptions = !this.showFilterOptions;
    console.log(this.showFilterOptions);
  }

  constructor() {}

  ngOnInit(): void {
    
  }

  speciality = new FormControl();
  // specs: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  specs1: any = [{key: 1,value: 'General Medicine'},
    {key: 2,value: 'Cardiology'},
    {key: 3,value: 'Pediatrics'},
    {key: 4,value: 'Oncologist'},
    {key: 5,value: 'Endocrinologist'},
    {key: 5,value: 'Neurology'},
    {key: 5,value: 'Radiology'}
  ]

  status: any = [{key: 1,value: 'Pending'},
    {key: 2,value: 'Resolved'},
    {key: 3,value: 'Closed'},
  ]

  physicianVisitType: any = [{key: 1,value: 'Escalation'},
    {key: 2,value: 'Compliance'},
    {key: 3,value: 'Other Appointments'},
  ]

  physicianCategory: any = [{key: 1,value: 'Hospital Visit'},
    {key: 2,value: 'Tele-consulation'},
    {key: 3,value: 'Home Visit'},
  ]

    
  submit() {
    // Get the checked values and set them to the input field
    const checkedValues = this.speciality.value;
    // ...
  }
  
  cancel() {
    // Reset the checked values to empty
    this.speciality.setValue([]);
  }

}
