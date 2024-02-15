import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-content',
  templateUrl: './filter-content.component.html',
  styleUrls: ['./filter-content.component.scss']
})
export class FilterContentComponent implements OnInit {

  cards = [
    { icon: 'hourglass-half', value1: 10, value2: 'Pending', bgColor: 'white' },
    { icon: 'thumbs-up', value1: 22, value2: 'Received', bgColor: 'white' },
    { icon: 'check-circle', value1: 123, value2: 'Closed', bgColor: 'white' },
    { icon: 'users', value1: 619, value2: 'Total Request', bgColor: 'white' }
  ];

  selectedCard: any;
  selectedCardIcon: any;

  selectCard(card: any) {
    this.selectedCard = card;
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

  constructor() { }

  ngOnInit(): void {
  }

}
