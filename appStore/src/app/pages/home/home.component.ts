import { Component, OnInit } from '@angular/core'

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  cols: number = 3
  category: string | undefined
  rowHeight: string | number = ROWS_HEIGHT[this.cols]

  onColumnsCountChange(colsNumber: any): void {
    this.cols = colsNumber
    this.rowHeight = ROWS_HEIGHT[this.cols]
  }

  onShowCategory(newCategory: any): void {
    this.category = newCategory
  }
}
