import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component'
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component'
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component'
import { TutorialsPublishedComponent } from './components/tutorials-published/tutorials-published.component'

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'tutorials/published', component: TutorialsPublishedComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
