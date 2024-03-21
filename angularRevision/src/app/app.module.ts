import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HeroChildComponent } from './components/parent-child-communication/hero-child/hero-child.component'
import { HeroParentComponent } from './components/parent-child-communication/hero-parent/hero-parent.component'
import { BasicComponentComponent } from './components/content-projection/basic-component/basic-component.component'
import { MultiContentProjectionComponent } from './components/content-projection/multi-content-projection/multi-content-projection.component'
import { ConditionalContentProjectionComponent } from './components/content-projection/conditional-content-projection/conditional-content-projection.component'
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { TemplatesComponent } from './components/templates/templates.component';
import { TwoWayDataBindingComponent } from './components/templates/two-way-data-binding/two-way-data-binding.component'
import { FormsModule } from '@angular/forms';
import { HighlighterDirective } from './highlighter.directive'

@NgModule({
  declarations: [
    AppComponent,
    HeroChildComponent,
    HeroParentComponent,
    BasicComponentComponent,
    MultiContentProjectionComponent,
    ConditionalContentProjectionComponent,
    TemplatesComponent,
    TwoWayDataBindingComponent,
    HighlighterDirective,

  ],
  imports: [BrowserModule, AppRoutingModule, NgComponentOutlet, AsyncPipe , FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
