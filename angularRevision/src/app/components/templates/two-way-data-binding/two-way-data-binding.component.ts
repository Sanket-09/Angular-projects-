import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-two-way-data-binding',
  templateUrl: './two-way-data-binding.component.html',
  styleUrls: ['./two-way-data-binding.component.scss'],
})
export class TwoWayDataBindingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() size!: number | string
  @Output() sizeChange = new EventEmitter<number>()

  dec() {
    this.resize(-1)
  }
  inc() {
    this.resize(+1)
  }

  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta))
    this.sizeChange.emit(this.size)
  }
}
