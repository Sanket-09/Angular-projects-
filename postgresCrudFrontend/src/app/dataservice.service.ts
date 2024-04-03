import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { response } from 'express'
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  constructor(private http: HttpClient) {
    this.loadInitialGridItems()
  }

  private gridItemsUrl = 'http://localhost:8000/users'
  private gridItemsSubject = new BehaviorSubject<any[]>([]) // Changed to BehaviorSubject

  gridItems$ = this.gridItemsSubject.asObservable()

  getGridItems(): Observable<any[]> {
    return this.http.get<any[]>(this.gridItemsUrl)
  }

  addUser(user: {
    imageURL: string
    addedBy: string
    createdDate: Date
    markettingRights: string
  }): Observable<any> {
    return this.http
      .post<any>(this.gridItemsUrl, user, {
        responseType: 'text' as 'json',
      })
      .pipe(
        tap(() => this.loadInitialGridItems()) // Refresh grid items after adding a user
      )
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.gridItemsUrl}/${id}`

    return this.http.delete(url, { responseType: 'text' as 'json' }).pipe(
      tap(() => {
        console.log(`User deleted with ID: ${id}`)
        this.loadInitialGridItems() // Refresh grid items after deleting a user
      }),
      catchError((error) => {
        console.error('Error deleting user:', error)
        return throwError(error) // Rethrow the error to be handled by the subscriber
      })
    )
  }

  editUser(id: number, user: { name: string; email: string }): Observable<any> {
    const url = `${this.gridItemsUrl}/${id}`

    return this.http
      .put<any>(url, user, {
        responseType: 'text' as 'json',
      })
      .pipe(
        tap(() => {
          console.log(`User edited with ID: ${id}`)
          this.loadInitialGridItems() // Optionally refresh grid items after editing a user
        }),
        catchError((error) => {
          console.error('Error editing user:', error)
          return throwError(error) // Rethrow the error to be handled by the subscriber
        })
      )
  }

  loadInitialGridItems() {
    this.getGridItems().subscribe((items) => {
      this.gridItemsSubject.next(items)
    })
  }
}
