import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ELEMENT_DATA } from '../services/data';
import { PeriodicElement } from '../services/data';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  currentId : any;
  currentElement : any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      console.log(id);
      this.currentId = id // or do whatever you want with the id value
      this.currentElement = ELEMENT_DATA.find(element => element.id === this.currentId);
      console.log(this.currentElement)
    });
  }

  
  






}
