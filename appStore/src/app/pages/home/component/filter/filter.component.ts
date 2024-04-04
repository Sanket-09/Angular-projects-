import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>()

  constructor() {}

  ngOnInit(): void {}

  categories = ['shoes', 'tank-tops', 'shirt']

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }
}
