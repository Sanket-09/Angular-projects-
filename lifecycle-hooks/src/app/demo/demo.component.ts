import { Component, Input, OnChanges, OnInit, SimpleChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnChanges, DoCheck{

  @Input() value: string = 'proacademy  '

  constructor() { 
    console.log("constructor called")
    console.log("called inside constructor || " + this.value);
  }

  ngOnInit(): void {
      console.log("ngOnInit Called")
      console.log("called inside ngOnInit ngOnInit ||" +this.value)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChange was called");
    console.log("called inside ngOnChanges ||  " + this.value) 
  }

  ngDoCheck(){                              //gets called everytime change detection cycle runs
    console.log("ngDoCheck was called");
    console.log("called inside ngDoCheck ||  " + this.value) 
  }

  ngAfterContentInit(){
    console.log("ngAfterContentInit was called"); //called only during the first change detection cycle
    console.log("called inside ngAfterContentInit ||  ")  //called when projected content is initialised
  }

  ngAfterContentChecked(){
    console.log("ngAfterContentChecked was called");  //called every time the projected content is changed
    console.log("called inside ngAfterContentChecked || " ); //called for each change detection cycle
  }

  ngAfterViewInit(){
    console.log("ngAfterViewInit was called"); //called when component view and all its child view are initialised
  }

  ngAfterViewChecked(){
    console.log("ngAfterViewChecked was called"); //called each time when component view and all its child view are changed
  }

  ngOnDestroy(){
    console.log("ngOnDestroy is called") //gets called just before the component or directive is called
  }
}
