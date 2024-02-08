import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss']
})
export class Component1Component implements OnInit {

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
  }

  enteredText : string = "";

  onButtonClick(){
    console.log(this.enteredText);
    this.dataService.raiseDataEmitterEvent(this.enteredText);
  }

}
