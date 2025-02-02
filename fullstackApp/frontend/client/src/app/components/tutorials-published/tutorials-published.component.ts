import { Component, OnInit } from '@angular/core'
import { Tutorial } from 'src/app/models/tutorial.model'
import { TutorialService } from '../../services/tutorial.service'

@Component({
  selector: 'app-tutorials-published',
  templateUrl: './tutorials-published.component.html',
  styleUrls: ['./tutorials-published.component.css'],
})
export class TutorialsPublishedComponent implements OnInit {
  tutorials?: Tutorial[]
  currentTutorial: Tutorial = {}
  currentIndex = -1
  title = ''

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials()
  }

  retrieveTutorials(): void {
    this.tutorialService.getAllPublished().subscribe({
      next: (data) => {
        this.tutorials = data
        console.log(data)
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

  searchTitle(): void {
    this.currentTutorial = {}
    this.currentIndex = -1

    this.tutorialService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.tutorials = data
        console.log(data)
      },
      error: (e) => console.error(e),
    })
  }
}
