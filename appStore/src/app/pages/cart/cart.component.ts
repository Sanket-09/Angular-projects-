import { Component, OnInit } from '@angular/core'
import { Cart, CartItem } from 'src/app/models/cart.model'
import { CartService } from 'src/app/services/cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart
      this.datasource = this.cart.items
    })
  }

  onCheckout() {
    throw new Error('Method not implemented.')
  }

  onRemoveFromCart(item: CartItem) {
    this.cartService.removeFromCart(item)
  }

  onClearCart() {
    this.cartService.clearCart()
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item)
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item)
  }

  cart: Cart = {
    items: [
      {
        product: 'https://picsum.photos/900',
        name: 'Sneakers',
        price: 450,
        quantity: 7,
        id: 1,
      },

      {
        product: 'https://picsum.photos/1000',
        name: 'Aglets',
        price: 125,
        quantity: 4,
        id: 2,
      },
    ],
  }

  datasource: Array<CartItem> = []
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ]
}
