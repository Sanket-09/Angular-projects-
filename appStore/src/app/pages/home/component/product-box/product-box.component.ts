import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Product } from 'src/app/models/product.model'

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss'],
})
export class ProductBoxComponent implements OnInit {
  @Output() addToCart = new EventEmitter()

  @Input() product: Product | undefined

  onAddToCart(): void {
    this.addToCart.emit(this.product)
  }

  @Input() fullwidthMode = false

  constructor() {}

  ngOnInit(): void {}
}
