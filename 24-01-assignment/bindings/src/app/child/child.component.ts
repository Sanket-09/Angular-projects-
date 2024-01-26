import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  @Input() receivedUserName: any = "";
  @Input() receivedPassword:any = "";

  constructor() { }
  
  ngOnInit(): void {
  }

}
