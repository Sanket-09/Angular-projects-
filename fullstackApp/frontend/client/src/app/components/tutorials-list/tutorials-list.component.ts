import { Component, OnInit } from '@angular/core'
import { Tutorial } from 'src/app/models/tutorial.model'
import { TutorialService } from '../../services/tutorial.service'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[]
  currentTutorial: Tutorial = {}
  currentIndex = -1
  title = ''
  categories: (string | undefined)[] = []
  selectedValue: any
  currentCategory: any

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials()
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe({
      next: (data) => {
        this.tutorials = data
        console.log(data)

        this.categories = [...new Set(data.map((movie) => movie.description))]
        this.categories.push('Show All')
        this.categories.reverse()
        console.log(this.categories)
      },
      error: (e) => console.error(e),
    })
  }

  refreshList(): void {
    this.retrieveTutorials()
    this.currentTutorial = {}
    this.currentIndex = -1
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial
    this.currentIndex = index
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll().subscribe({
      next: (res) => {
        console.log(res)
        this.refreshList()
      },
      error: (e) => console.error(e),
    })
  }

  searchTitle(): void {
    this.currentTutorial = {}
    this.currentIndex = -1

    this.tutorialService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.tutorials = data
      },
      error: (e) => console.error(e),
    })
  }

  onCategoryChange($event: any) {
    this.tutorialService.getSortedData(this.currentCategory).subscribe({
      next: (data) => {
        this.tutorials = data
      },
      error: (e) => console.log(e),
    })
  }
}
