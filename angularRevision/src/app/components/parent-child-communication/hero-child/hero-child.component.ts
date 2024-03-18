import { Component, Input, OnInit } from '@angular/core'
import { EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-hero-child',
  templateUrl: './hero-child.component.html',
  styleUrls: ['./hero-child.component.scss'],
})
export class HeroChildComponent implements OnInit {
  constructor() {}

  @Input() item = ''

  @Output() newItemEvent = new EventEmitter<string>()

  addNewItem(value: any) {
    this.newItemEvent.emit(value)
  }

  ngOnInit(): void {}
}
