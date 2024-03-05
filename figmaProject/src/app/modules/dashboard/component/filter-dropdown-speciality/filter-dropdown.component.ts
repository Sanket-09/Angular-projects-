import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { ReplaySubject, Subject, Subscription } from 'rxjs'
import { take, takeUntil } from 'rxjs/operators'
import { MatSelect, MatSelectChange } from '@angular/material/select'
import { FilterService } from '../../../shared/services/filter.service'

import { Bank, BANKS } from './demo-data'
import { MatOption } from '@angular/material/core'
import { DashboardService } from '../../dashboard.service'

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
})
export class FilterDropdownComponent implements OnInit {
  @ViewChild('select') select!: MatSelect

  private subscription: Subscription

  @Output() selectedValuesChange: EventEmitter<string> =
    new EventEmitter<string>()

  selectedValues: string[] = []

  removedValue: any

  allSelected = false

  toggleAllSelection() {
    this.filteredBanksMulti
      .asObservable()
      .pipe(take(1))
      .subscribe((filteredBanks) => {
        if (this.allSelected) {
          // Select all options except ngx-mat-select-search
          const banksToSelect = filteredBanks.filter(
            (bank) => bank.name !== 'ngx-mat-select-search'
          )
          this.bankMultiCtrl.setValue(banksToSelect)
        } else {
          this.bankMultiCtrl.setValue([])
        }
      })
  }

  onSelectionChange($event: any) {
    // this.selectedValuesChange.emit(this.selectedValues.join(','));

    if ($event.isUserInput) {
      if ($event.source.selected) {
        this.selectedValues.push($event.source.value)
      } else {
        this.selectedValues = this.selectedValues.filter(
          (value) => value !== $event.source.value
        )
      }
    }

    this.cdRef.detectChanges()
  }

  logSelectedValues() {
    // console.log(this.selectedValues);
    // this.FilterService.currentSelectedValues = this.selectedValues;

    this.FilterService.emitFilterCategory(this.selectedValues)

    // this.FilterService.applyFilter();
  }

  cancelAll() {
    this.selectedValues = []
    this.bankMultiCtrl.setValue([])
    this.allSelected = false
  }

  protected banks: Bank[] = BANKS

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl<Bank[] | null> = new FormControl<Bank[]>([])

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl<string | null> =
    new FormControl<string>('')

  /** list of banks filtered by search keyword */
  public filteredBanksMulti: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(
    1
  )

  @ViewChild('multiSelect', {
    static: true,
  })
  multiSelect!: MatSelect

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>()

  constructor(
    private FilterService: FilterService,
    private cdRef: ChangeDetectorRef,
    private dashBoardService: DashboardService
  ) {
    this.subscription = this.FilterService.chipMethodCalled$.subscribe(
      (chipEmitList: any) => {
        this.onChipMethodCalled(chipEmitList)
      }
    )
  }

  specialityList: any

  onChipMethodCalled(chipEmitList: any) {
    this.selectedValues = [...chipEmitList]

    this.onSelectionChange(chipEmitList)
    this.cdRef.detectChanges()
  }

  ngOnInit(): void {
    // listen for search field value changes

    this.dashBoardService.getSpecialityList().subscribe((data: any) => {
      for (let i = 0; i < Math.max(BANKS.length, data.data.length); i++) {
        const existingList = BANKS[i]
        const additionalUpdatedList = data.data[i]

        if (existingList && additionalUpdatedList) {
          existingList.name = additionalUpdatedList.name
        } else if (additionalUpdatedList) {
          BANKS.push({
            key: BANKS.length + i + 1,
            name: additionalUpdatedList.name,
          })
        }
      }

      this.bankMultiCtrl.setValue([])

      // load the initial bank list
      this.filteredBanksMulti.next(this.banks.slice())

      this.bankMultiFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanksMulti()
        })
    })
  }

  protected filterBanksMulti() {
    if (!this.banks) {
      return
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value
    if (!search) {
      this.filteredBanksMulti.next(this.banks.slice())
      return
    } else {
      search = search.toLowerCase()
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.banks.filter((bank) => bank.name.toLowerCase().indexOf(search!) > -1)
    )
  }
}
