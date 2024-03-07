import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { ReplaySubject, Subject, Subscription } from 'rxjs'
import { take, takeUntil } from 'rxjs/operators'
import { MatSelect } from '@angular/material/select'
import { FilterService } from '../../../shared/services/filter.service'
import { DashboardService } from '../../dashboard.service'
import { Bank, BANKS } from './demo-data'

@Component({
  selector: 'app-filter-dropdown-category',
  templateUrl: './filter-dropdown-category.component.html',
  styleUrls: ['./filter-dropdown-category.component.scss'],
})
export class FilterDropdownCategoryComponent implements OnInit {
  @ViewChild('select') select!: MatSelect

  private subscription: Subscription

  @Output() selectedValuesChange: EventEmitter<string> =
    new EventEmitter<string>()

  selectedValues: any
  something: any

  allSelected = false

  toggleAllSelection() {
    this.filteredBanksMulti
      .asObservable()
      .pipe(take(1))
      .subscribe((filteredBanks) => {
        if (this.allSelected) {
          // Select all options except ngx-mat-select-search
          const banksToSelect = filteredBanks.filter(
            (bank) => bank.value !== 'ngx-mat-select-search'
          )
          this.bankMultiCtrl.setValue(banksToSelect)
        } else {
          this.bankMultiCtrl.setValue([])
        }
      })
  }

  onSelectionChange($event: any, action: string) {
    // this.selectedValuesChange.emit(this.selectedValues.join(','));

    if (action == 'remove') {
      console.log($event)
      console.log(this.selectedValues)
      this.something = this.selectedValues.filter(
        (value: { value: any }) => value.value !== $event
      )

      this.selectedValues = this.something
    }

    this.cdRef.detectChanges()
  }

  logSelectedValues() {
    // console.log(this.selectedValues);
    // this.FilterService.currentSelectedValues = this.selectedValues;

    this.FilterService.emitFilterSpeciality(this.selectedValues)

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
    this.onSelectionChange(chipEmitList, 'remove')

    this.cdRef.detectChanges()
  }

  ngOnInit(): void {
    // listen for search field value changes

    this.bankMultiCtrl.setValue([])

    // load the initial bank list
    this.filteredBanksMulti.next(this.banks.slice())

    this.bankMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti()
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
      this.banks.filter(
        (bank) => bank.value.toLowerCase().indexOf(search!) > -1
      )
    )
  }
}
