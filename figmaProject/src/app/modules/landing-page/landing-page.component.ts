import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ELEMENT_DATA } from '../services/data';
import { PeriodicElement } from '../services/data';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {


  copyPhonefn() {
    const idContent = document.getElementById('copyPhoneNumber')?.innerText;
    
    if(idContent){
      this.clipboard.copy(idContent);
      alert("Phone Number Copied")
    }

    else
    alert("Error")
  }



  copyIdfn(){
    const idContent = document.getElementById('copyId')?.innerText;
    
    if(idContent){
      this.clipboard.copy(idContent);
      alert("Id Copied")
    }

    else
    alert("Error")
  }

  currentId : any;
  currentElement : any;

  constructor(private route: ActivatedRoute , private clipboard: Clipboard) { }

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
