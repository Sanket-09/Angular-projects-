import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { loadStripe } from '@stripe/stripe-js'
import { Cart, CartItem } from 'src/app/models/cart.model'
import { CartService } from 'src/app/services/cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart
      this.datasource = this.cart.items
    })
  }

  onCheckout(): void {
    this.http
      .post('http://localhost:4242/checkout', {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51P3EwSSFU85WlZULf8bSgiQHSGxoIynWGva7gvY5nEdXyzu7ktrj218J2P2f57DGpr06OF4ZT7VYVd4AT2SRHqYA006vjD1931'
        )
        stripe?.redirectToCheckout({
          sessionId: res.id,
        })
      })
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
