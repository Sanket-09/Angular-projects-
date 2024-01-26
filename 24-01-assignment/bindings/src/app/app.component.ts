import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'this text is called using interpolation';
  myName = 'Sanket Jaiswal' //interpolation
  isDisabled = true;  //property binding

  cssStringVar: string= 'redColor';
 
}
