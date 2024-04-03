// data.service.ts

import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private gridItemsSubject = new BehaviorSubject<any[]>(
    this.getStoredGridItems()
  )
  gridItems$ = this.gridItemsSubject.asObservable()

  constructor() {}

  getGridItems() {
    return this.gridItemsSubject.value
  }

  getGridItem(id: number) {
    const items = this.gridItemsSubject.value
    return items[id]
  }

  addGridItem(item: any) {
    const currentItems = this.gridItemsSubject.value
    const updatedItems = [...currentItems, item]
    this.gridItemsSubject.next(updatedItems)
    this.storeGridItems(updatedItems)
  }

  updateGridItem(id: number, updatedItem: any) {
    const items = this.gridItemsSubject.value
    if (id >= 0 && id < items.length) {
      items[id] = updatedItem
      this.gridItemsSubject.next([...items])
      this.storeGridItems(items)
    }
  }

  private storeGridItems(items: any[]) {
    localStorage.setItem('gridItems', JSON.stringify(items))
  }

  getStoredGridItems(): any[] {
    const storedItems = localStorage.getItem('gridItems')
    return storedItems ? JSON.parse(storedItems) : []
  }
}
