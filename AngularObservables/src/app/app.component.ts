import { Component } from '@angular/core';
import { Observable, filter, from, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularObservables';

  //using observable constructor
  // myObservable = new Observable( (observer) => {
  //     console.log("observable starts")
  //     setTimeout(()=>{ observer.next("1")},2000)
  //     setTimeout(()=>{observer.next("2")},4000)
  //     setTimeout(()=>{observer.next("3")},6000)
  //     setTimeout(()=>{observer.error(new Error('Something went wrong'))},6000)
  //     setTimeout(()=>{observer.complete()},6000)
  //     setTimeout(()=>{ observer.next("4")},8000)
  //     setTimeout(()=>{observer.next("5")},10000)
  //     setTimeout(()=>{observer.complete()},10000)
      
  // })


  //using create method 
  // myObservable = Observable.create((observer: { next: (arg0: string) => void; })=>{
  //     setTimeout(()=>{observer.next("A")},1000)
  //     setTimeout(()=>{observer.next("B")},2000)
  //     setTimeout(()=>{observer.next("C")},3000)
  //     setTimeout(()=>{observer.next("D")},4000)
  //     setTimeout(()=>{observer.next("E")},5000)
  // });

  array1 = [1,2,3,4,5,6,7,8,9,12];
  array2 = ['A', 'B', 'C' , 'D', 'E'];

  // myObservable = of(this.array1, this.array2) //emits the iterable as it is , takes n numebr of args

  myObservable = from(this.array1); //emits the value in array1 one by one , takes only one args and that too iterable

  transformedObservable = this.myObservable.pipe(map((value)=>{
    return value*5;
  }),filter((value)=>{
    return value >= 30
  })
  )

  filterObservable = this.transformedObservable.pipe(filter((value)=>{
    return value >= 30
  }))


  ngOnInit(){
    this.transformedObservable.subscribe((value: any)=>{
      console.log(value);
    } , (error: { message: any; })=>{
        alert(error.message);
    }, ()=>{
        alert("Observable has completed emitting all values")
    });     //takes optional parameters as callback functions, ie - next, error, complete
  }
}
