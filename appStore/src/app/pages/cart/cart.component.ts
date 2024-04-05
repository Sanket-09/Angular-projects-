import { Component, OnInit } from '@angular/core'
import { Cart, CartItem } from 'src/app/models/cart.model'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.datasource = this.cart.items
  }

  cart: Cart = {
    items: [
      {
        product: 'https://picsum.photos/900',
        name: 'Sneakers',
        price: 450,
        quantity: 10,
        id: 1,
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
