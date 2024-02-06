import { Component, OnInit, inject } from '@angular/core';
import { productService } from '../../service/products.service';
import { Product } from '../../model/products';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../service/data.service';




@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css']
})
export class DetailsCardComponent implements OnInit {

  selectedCard : Product;
  cardId : string;
  myData : any;
  dataLoaded : boolean = false;

  cardService : productService = inject(productService);
  activeRoute : ActivatedRoute = inject(ActivatedRoute);

  constructor(private dataservice : DataService) { 
    this.cardId = this.activeRoute.snapshot.paramMap.get('id');
    if(this.cardId){
    this.dataservice.getDataById(this.cardId).subscribe(data=>{
      this.myData = data;
      this.dataLoaded = true;
      console.log('inside',this.myData);
    });
  }
  }

  ngOnInit(){
    
    console.log('outside',this.myData);
  }

  
  isDataLoaded() : boolean {
    return this.dataLoaded;
  }

}
