import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core'

@Component({
  selector: 'app-conditional-content-projection',
  templateUrl: './conditional-content-projection.component.html',
  styleUrls: ['./conditional-content-projection.component.scss'],
})
export class ConditionalContentProjectionComponent implements OnInit {
  contentId: any
  expanded: any

  constructor(public templateRef: TemplateRef<unknown>) {}

  @ContentChild(ConditionalContentProjectionComponent)
  content!: ConditionalContentProjectionComponent

  ngOnInit(): void {}
}
