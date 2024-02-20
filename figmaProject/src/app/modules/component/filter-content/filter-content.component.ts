import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterService } from '../../services/filter.service';




@Component({
  selector: 'app-filter-content',
  templateUrl: './filter-content.component.html',
  styleUrls: ['./filter-content.component.scss']
})
export class FilterContentComponent implements OnInit {

  ngOnInit(): void {
    
  }
 
  totalCount : number | undefined;

  constructor(private FilterService: FilterService) { 

  }

  @Output() currentStatus =  new EventEmitter<string>();
  
  
  cards = [
    { icon: 'hourglass-half', value1: 16, value2: 'Pending', bgColor: 'white' },
    { icon: 'thumbs-up', value1: 6, value2: 'Resolved', bgColor: 'white' },
    { icon: 'check-circle', value1: 8, value2: 'Closed', bgColor: 'white' },
    { icon: 'users', value1: 30, value2: 'Total Request', bgColor: 'white' }
  ];

  selectedCard: any;
  selectedCardIcon: any;

  selectCard(card: any) {
    this.selectedCard = card;
    this.applyFilter(card.value2);
  }

  applyFilter(status : string){
    this.FilterService.emitFilter(status);
    // this.FilterService.currentFilterStatus = status;
    // this.FilterService.applyFilter();
  }


  isSelected(card: any): boolean {
    return this.selectedCard === card;
  }

  selectCardIcon(card: any) {
    this.selectedCard = card;
  }

  isSelectedIcon(card: any): boolean {
    return this.selectedCard === card;
  }

 

 

}
