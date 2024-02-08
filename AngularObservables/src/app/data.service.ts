import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  dataEmitter = new EventEmitter<string>();

  raiseDataEmitterEvent(data : string){
    this.dataEmitter.emit(data); 
  }
}


