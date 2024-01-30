// app.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  showAddItem : boolean = false;
  showEditItem : boolean = false;
  showHomePage : boolean = true;


  gridItems: any[] = this.dataService.getStoredGridItems();

  constructor(private router: Router, private dataService: DataService) {}

  onItemClick(index:number){
    console.log('the index is', index)
  }
  

  ngOnInit() {
   
    this.dataService.gridItems$.subscribe((items) => {
    
      this.gridItems = items ? [...items] : [];
      console.log(this.gridItems);
    });
  }

  editItem(index: number) {
    this.router.navigate([`/edit-item/${index}`]);
        // this.showEditItem = !this.showEditItem;
        // this.showHomePage = !this.showHomePage;
        var elem = document.getElementById("EditForm");
        elem?.scrollIntoView()
  }

  navigateToAddItem() {
   this.showAddItem = true;
   this.showEditItem = false;
  }

  // editItemDetails(index: number) {
  //   this.showAddItem = false;
  //   this.showEditItem = true;
  //   console.log('the index is', index)
  // }
}
