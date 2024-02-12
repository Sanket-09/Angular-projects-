import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  options : string[] = ["Apple", "Mango" , "WaterMelon" , "Bangalore" , "Banana", "Mumbai", "Warsaw", "Alladin" , "Alex", "Applet"]
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;

  myForm : FormGroup | any;
  messages : string[] = [];
  expanded = false;

  buffer : any
sliderValue: any;


  
  constructor( private fb:FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      message: ''
    });

    this.myForm.valueChanges.subscribe((value: { message: string; }) => {
      this.messages.push(value.message);
    });
  }

  onSubmit() {
    const messageValue = this.myControl.value;
    console.log(messageValue);
    if (messageValue) {
      this.messages.push(messageValue);
    }   

    var buffer : any = sessionStorage.setItem('key' , JSON.stringify(this.messages));


    this.messages = JSON.parse(buffer)
  }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  onSelectOption(event: any){
console.log(event)
  }

}
