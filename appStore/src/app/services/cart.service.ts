import { Injectable } from '@angular/core'
import { BehaviorSubject, filter } from 'rxjs'
import { Cart, CartItem } from '../models/cart.model'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _snackBar: MatSnackBar) {}

  cart = new BehaviorSubject<Cart>({ items: [] })

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items]

    const itemInCart = items.find((_item) => _item.id === item.id)

    if (itemInCart) {
      itemInCart.quantity++
    } else {
      items.push(item)
    }

    this.cart.next({ items })
    this._snackBar.open('1 Item added to cart.', 'Ok', { duration: 3000 })
    console.log(this.cart.value)
  }

  removeQuantity(item: CartItem) {
    let itemForRemoval: CartItem | undefined

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--

        if (_item.quantity === 0) {
          itemForRemoval = _item
        }
      }
      return _item
    })

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false)
    }

    this.cart.next({ items: filteredItems })
    this._snackBar.open('Item cleared from the cart', 'Okay!', {
      duration: 3000,
    })
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, curr) => prev + curr, 0)
  }

  clearCart(): void {
    this.cart.next({ items: [] })
    this._snackBar.open('Cart is clear!', 'Okay', { duration: 3000 })
  }

  removeFromCart(item: CartItem, updateCart = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter((_item) => {
      return _item.id !== item.id
    })

    if (updateCart) {
      this.cart.next({ items: filteredItems })
      this._snackBar.open('Item Cleared from cart', 'Okay!', {
        duration: 3000,
      })
    }

    return filteredItems
  }
}
