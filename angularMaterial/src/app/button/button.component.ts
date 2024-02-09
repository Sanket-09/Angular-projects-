import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  showDelay = new FormControl(1000);
  hideDelay = new FormControl(2000);


  constructor() { }

  ngOnInit(): void {
  }

}
