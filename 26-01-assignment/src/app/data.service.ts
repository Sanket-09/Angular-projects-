// data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private gridItemsSubject = new BehaviorSubject<any[]>(
    this.getStoredGridItems()
  );
  gridItems$ = this.gridItemsSubject.asObservable();

  constructor() {}

  getGridItems() {
    return this.gridItemsSubject.value;
  }

  getGridItem(index: number) {
    const items = this.gridItemsSubject.value;
    return items[index];
  }

  addGridItem(item: any) {
    const currentItems = this.gridItemsSubject.value;
    const updatedItems = [...currentItems, item];
    this.gridItemsSubject.next(updatedItems);
    this.storeGridItems(updatedItems);
  }

  updateGridItem(index: number, updatedItem: any) {
    const items = this.gridItemsSubject.value;
    if (index >= 0 && index < items.length) {
      items[index] = updatedItem;
      this.gridItemsSubject.next([...items]);
      this.storeGridItems(items);
    }
  }

  private storeGridItems(items: any[]) {
    localStorage.setItem('gridItems', JSON.stringify(items));
  }
  
  getStoredGridItems(): any[] {
    const storedItems = localStorage.getItem('gridItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }
}
