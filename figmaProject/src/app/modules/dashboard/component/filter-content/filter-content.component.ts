import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FilterService } from '../../../shared/services/filter.service'

import { DashboardService } from '../../dashboard.service'

@Component({
  selector: 'app-filter-content',
  templateUrl: './filter-content.component.html',
  styleUrls: ['./filter-content.component.scss'],
})
export class FilterContentComponent implements OnInit {
  allDataCount: number = 0
  pendingDataCount: number = 0
  resolvedDataCount: number = 0
  closedDataCount: number = 0
  cards:
    | {
        icon: string
        iconSelected: string
        value1: number
        value2: string
        bgColor: string
      }[]
    | undefined

  ngOnInit(): void {
    this.dashBoardService.getBucketCount().subscribe((data) => {
      console.log(data.data)

      this.allDataCount = data.data[2].count
      this.pendingDataCount = data.data[0].count
      this.resolvedDataCount = data.data[1].count
      this.closedDataCount = data.data[3].count

      this.initializeCards()
    })
  }

  totalCount: number | undefined

  constructor(
    private FilterService: FilterService,
    private dashBoardService: DashboardService
  ) {}

  @Output() currentStatus = new EventEmitter<string>()

  initializeCards() {
    this.cards = [
      {
        icon: './../../../../assets/icons-unselected-filter-content/hour-glass.fill.svg',
        iconSelected:
          './../../../../assets/icons-selected-filter-content/hour-glass.fill.svg',
        value1: this.pendingDataCount,
        value2: 'Pending',
        bgColor: 'white',
      },
      {
        icon: './../../../../assets/icons-unselected-filter-content/Recommend.fill.svg',
        iconSelected:
          './../../../../assets/icons-selected-filter-content/Recommend.fill.svg',
        value1: this.resolvedDataCount,
        value2: 'Resolved',
        bgColor: 'white',
      },
      {
        icon: './../../../../assets/icons-unselected-filter-content/checkbox.fill.svg',
        iconSelected:
          './../../../../assets/icons-selected-filter-content/checkbox.fill.svg',
        value1: this.closedDataCount,
        value2: 'Closed',
        bgColor: 'white',
      },
      {
        icon: './../../../../assets/icons-unselected-filter-content/Group.fill.svg',
        iconSelected:
          './../../../../assets/icons-selected-filter-content/Group.fill.svg',
        value1: this.allDataCount,
        value2: 'Total Request',
        bgColor: 'white',
      },
    ]
  }

  selectedCard: any
  selectedCardIcon: any

  selectCard(card: any) {
    this.selectedCard = card

    this.applyFilter(card.value2)
  }

  applyFilter(status: string) {
    this.FilterService.emitFilter(status)
    // this.FilterService.currentFilterStatus = status;
    // this.FilterService.applyFilter();
  }

  isSelected(card: any): boolean {
    return this.selectedCard === card
  }

  selectCardIcon(card: any) {
    this.selectedCard = card
  }

  isSelectedIcon(card: any): boolean {
    return this.selectedCard === card
  }
}
