import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lifecycle-hooks';
  inputText : any = ''

  onSubmit(inputEl: HTMLInputElement)
  {
    this.inputText = inputEl.value;
  }

}
