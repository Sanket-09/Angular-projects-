import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.scss']
})
export class EventBindingComponent implements OnInit {
  
  
  updatedSearchEvent(event: any) {
    this.searchText = event.target.value;
  }

  searchText: string = "Prepopulated search Text"

  count = 0;
  clickMe() {
    this.count++;
  }

  ResetMe() {
    this.count = 0;
  }

  title = "Heading here"

  constructor() {}

  ngOnInit(): void {}

}
