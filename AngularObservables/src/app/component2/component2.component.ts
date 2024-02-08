import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.scss']
})
export class Component2Component implements OnInit {

  constructor(private dataService : DataService) { }

  ngOnInit(): void {

    this.dataService.dataEmitter.subscribe((value)=>{
      this.inputText = value;
    });
  }

  inputText : string = "";

}
