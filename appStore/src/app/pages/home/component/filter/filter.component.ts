import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>()

  categoriesSubscription: Subscription | undefined
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((response) => {
        this.categories = response
      })
  }

  categories: Array<string> | undefined

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe()
    }
  }
}
