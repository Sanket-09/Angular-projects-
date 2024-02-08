import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularObservables';

  myObservable = new Observable( (observer) => {
      console.log("observable starts")
      setTimeout(()=>{ observer.next("1")},2000)
     
      setTimeout(()=>{observer.next("2")},4000)
      
      setTimeout(()=>{observer.next("3")},6000)
      
      setTimeout(()=>{ observer.next("4")},8000)
     
      setTimeout(()=>{observer.next("5")},10000)
      
  })

  ngOnInit(){
    this.myObservable.subscribe((value)=>{
      console.log(value);
    });     //takes optional parameters as callback functions, ie - next, error, complete
  }
}
