import { Directive, ElementRef } from '@angular/core'

@Directive({
  selector: '[appHighlighter]',
})
export class HighlighterDirective {
  constructor(private ele: ElementRef) {
    this.ele.nativeElement.style.backgroundColor = 'yellow'
  }
}
