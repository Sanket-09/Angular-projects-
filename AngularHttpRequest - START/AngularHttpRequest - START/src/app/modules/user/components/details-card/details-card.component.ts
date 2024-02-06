import { Component, OnInit, inject } from '@angular/core';
import { productService } from '../../service/products.service';
import { Product } from '../../model/products';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css']
})
export class DetailsCardComponent implements OnInit {

  selectedCard : Product;
  cardId : string;

  cardService : productService = inject(productService);
  activeRoute : ActivatedRoute = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(){

    this.cardId = this.activeRoute.snapshot.paramMap.get('id');
    
    console.log(this.cardId);

  }

}
