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
  currentValue: any

  ngOnInit(): void {
    this.dashBoardService.getBucketCount().subscribe((data) => {
      this.setMethod(data)
      this.initializeCards()

      this.dashBoardService.dataUpdatedSubject.subscribe(() => {
        this.updatedData()
      })
    })
  }

  updatedData() {
    this.dashBoardService.getBucketCount().subscribe((data) => {
      this.setMethod(data)

      // Update only the value1 property of each card
      this.cards!.forEach((card) => {
        switch (card.value2) {
          case 'Pending':
            card.value1 = this.pendingDataCount
            break
          case 'Resolved':
            card.value1 = this.resolvedDataCount
            break
          case 'Closed':
            card.value1 = this.closedDataCount
            break
          case 'Total Request':
            card.value1 = this.allDataCount
            break
        }
      })
    })
  }

  setMethod(data: any) {
    this.allDataCount = data.data.find(
      (item: any) => item.key === 'total'
    ).count
    this.pendingDataCount = data.data.find(
      (item: any) => item.key === 'pending'
    ).count
    this.resolvedDataCount = data.data.find(
      (item: any) => item.key === 'resolved'
    ).count
    this.closedDataCount = data.data.find(
      (item: any) => item.key === 'closed'
    ).count
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
