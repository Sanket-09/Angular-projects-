import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-hero-parent',
  templateUrl: './hero-parent.component.html',
  styleUrls: ['./hero-parent.component.scss'],
})
export class HeroParentComponent implements OnInit {
  constructor() {}

  items = ['item1', 'item2', 'item3', 'item4']

  addItem(newItem: string) {
    this.items.push(newItem)
  }

  currentItem = 'Television'

  ngOnInit(): void {}
}
