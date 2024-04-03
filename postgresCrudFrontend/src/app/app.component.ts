import { Component } from '@angular/core'
import { DataserviceService } from './dataservice.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'postgresCrudFrontend'

  userName: string | any
  email: string | any

  idToDelete: any
  data: any

  idToEdit: any
  nameToEdit: any
  emailToEdit: any

  imageURL: any
  addedBy: any
  createdDate: any
  markettingRights: any

  constructor(private dataService: DataserviceService) {
    this.refreshGridItems() // Initial fetch of grid items
  }

  buttonClicked() {
    if (
      this.imageURL != null &&
      this.addedBy != null &&
      this.createdDate != null &&
      this.markettingRights != null
    ) {
      this.dataService
        .addUser({
          imageURL: this.imageURL,
          addedBy: this.addedBy,
          createdDate: this.createdDate,
          markettingRights: this.markettingRights,
        })
        .subscribe({
          next: (response) => {
            console.log('User added:', response)
            this.refreshGridItems() // Refresh grid items after adding a user
          },
          error: (error) => console.error('Error adding user:', error),
        })
    }
  }

  // Method to fetch and log grid items
  refreshGridItems() {
    this.dataService.getGridItems().subscribe({
      next: (items) => {
        console.log(items)
        this.data = items
      },
      error: (error) => console.error('Error fetching grid items:', error),
    })
  }

  deleteId() {
    if (this.idToDelete != null) {
      this.dataService.deleteUser(this.idToDelete).subscribe({
        next: (response) => {
          console.log(response)
          this.refreshGridItems()
        },
        error: (error) => console.error('Error deleting user:', error),
      })
    }
  }

  editId() {
    if (this.idToEdit != null) {
      this.dataService
        .editUser(this.idToEdit, {
          name: this.nameToEdit,
          email: this.emailToEdit,
        })
        .subscribe({
          next: (response) => {
            console.log(response)
            this.refreshGridItems()
          },
          error: (error) => console.error('Error editing user:', error),
        })
    }
  }
}
