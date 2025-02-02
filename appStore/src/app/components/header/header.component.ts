import { Component, Input, OnInit } from '@angular/core'
import { Cart, CartItem } from 'src/app/models/cart.model'
import { CartComponent } from 'src/app/pages/cart/cart.component'
import { CartService } from 'src/app/services/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  private _cart: Cart = { items: [] }
  itemsQuantity = 0

  @Input()
  get cart(): Cart {
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curr) => prev + curr, 0)
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart() {
    this.cartService.clearCart()
  }
}
