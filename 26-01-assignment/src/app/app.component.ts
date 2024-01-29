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
  gridItems: any[] = this.dataService.getStoredGridItems();

  constructor(private router: Router, private dataService: DataService) {}

  

  ngOnInit() {
   
    this.dataService.gridItems$.subscribe((items) => {
    
      this.gridItems = items ? [...this.getExistingItems(), ...items] : [];
    });
  }

  editItem(itemId: string) {
    this.router.navigate([`/edit-item/${itemId}`]);
  }

  navigateToAddItem() {
    this.router.navigate(['/addItem']);
  }

  editItemDetails(index: number) {
    this.router.navigate([`/edit-item/${index}`]);
  }

  private getExistingItems(): any[] {
    
    return [

    ];
  }

}
