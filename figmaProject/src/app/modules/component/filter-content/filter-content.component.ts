import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FilterService } from '../../services/filter.service'
import { ELEMENT_DATA, PeriodicElement } from '../../services/data'

@Component({
  selector: 'app-filter-content',
  templateUrl: './filter-content.component.html',
  styleUrls: ['./filter-content.component.scss'],
})
export class FilterContentComponent implements OnInit {
  allData: any = ELEMENT_DATA.filter((val) => {
    if (typeof val == 'object') {
      return true
    } else {
      return false
    }
  })

  pendingData: any = ELEMENT_DATA.filter((val) => {
    if (val.status == 'Pending') {
      return true
    } else {
      return false
    }
  })

  resolvedData: any = ELEMENT_DATA.filter((val) => {
    if (val.status == 'Resolved') {
      return true
    } else {
      return false
    }
  })

  closedData: any = ELEMENT_DATA.filter((val) => {
    if (val.status == 'Closed') {
      return true
    } else {
      return false
    }
  })

  allDataCount: number = this.allData.length
  pendingDataCount: number = this.pendingData.length
  resolvedDataCount: number = this.resolvedData.length
  closedDataCount: number = this.closedData.length

  ngOnInit(): void {}

  totalCount: number | undefined

  constructor(private FilterService: FilterService) {}

  @Output() currentStatus = new EventEmitter<string>()

  cards = [
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
