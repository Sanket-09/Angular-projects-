import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  message = 'Hi I am kid';
  constructor() { 
    setTimeout(() => {  
      this.message = 'Psych, I am actually not a kid anymore'
    }, 3000);
  }

  ngOnInit(): void {
  }

}
