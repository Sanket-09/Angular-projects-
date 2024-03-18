import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  currentCustomer: string = 'Sanket'
  itemImageUrl = 'https://picsum.photos/200/100'
  buttonColor = 'grey'
  actionName = 'Hit me up'
  clickMessage: any = ''
  fontSizePx = 16
}
