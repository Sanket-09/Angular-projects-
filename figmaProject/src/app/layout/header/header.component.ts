import { Component, OnInit } from '@angular/core'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FilterService } from '../../modules/services/filter.service'

interface hospital {
  value: string
  viewValue: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  inputSearch: string | undefined

  search(event: KeyboardEvent, input: HTMLInputElement): void {
    if (event.key === 'Enter') {
      this.inputSearch = input.value
      alert(this.inputSearch)
      // this.FilterService.emitFilter(this.inputSearch);
      this.FilterService.emitFilterSearch(this.inputSearch)
    }
  }

  hospital: hospital[] = [
    { value: 'trinity-0', viewValue: 'Trinity Hospital' },
    { value: 'appolo-1', viewValue: 'Appolo Hospital' },
    { value: 'tata-2', viewValue: 'Tata AIG' },
  ]
  selected: any

  constructor(private FilterService: FilterService) {}

  ngOnInit(): void {}
}
