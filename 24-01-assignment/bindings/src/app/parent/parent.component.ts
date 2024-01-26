import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  userName: any = "";
  password: any = "";
  receivedUserName: any = ""
  receivedPassword:any = ""
  messageSent: boolean = false

  constructor() { }

  sendInfo(){
    this.messageSent = !this.messageSent  
  }

  ngOnInit(): void {
  }

}
