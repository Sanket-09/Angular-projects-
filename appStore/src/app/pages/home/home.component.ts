import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Product } from 'src/app/models/product.model'
import { CartService } from 'src/app/services/cart.service'
import { StoreService } from 'src/app/services/store.service'

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts()
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe()
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products
      })
  }

  cols: number = 3
  category: string | undefined
  rowHeight: string | number = ROWS_HEIGHT[this.cols]
  products: Array<Product> | undefined
  sort = 'desc'
  count = '12'
  productsSubscription: Subscription | undefined

  onColumnsCountChange(colsNumber: any): void {
    this.cols = colsNumber
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }

  onShowCategory(newCategory: any): void {
    this.category = newCategory
    this.getProducts()
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    })
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString()
    this.getProducts()
  }

  onSortChange(newSort: string): void {
    this.sort = newSort
    this.getProducts()
  }
}