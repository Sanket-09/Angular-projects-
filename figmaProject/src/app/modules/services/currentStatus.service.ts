// tab.service.ts
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { MatTabChangeEvent } from '@angular/material/tabs'

@Injectable({
  providedIn: 'root',
})
export class TabService {
  private tabChangeSubject = new Subject<MatTabChangeEvent>()

  tabChange$ = this.tabChangeSubject.asObservable()

  emitTabChange(event: MatTabChangeEvent): void {
    this.tabChangeSubject.next(event)
  }
}
