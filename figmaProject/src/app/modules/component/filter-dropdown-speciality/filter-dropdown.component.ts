import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { FilterService } from '../../services/filter.service';

import { Bank, BANKS } from './demo-data';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss']
})
export class FilterDropdownComponent implements OnInit {

selectedValues: string[] = [];


onSelectionChange($event: any) {
 if($event.isUserInput)
 {
  if($event.source.selected){
    this.selectedValues.push($event.source.value);
  }
  else{
    this.selectedValues = this.selectedValues.filter(value => value !== $event.source.value)
  }
 }
}

logSelectedValues(){
  console.log(this.selectedValues);
  this.FilterService.emitFilterSpeciality(this.selectedValues);
}

cancelAll(){
  this.selectedValues = [];
}


  protected banks: Bank[] = BANKS;

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl<Bank[] | null> = new FormControl<Bank[]>([]);

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl<string | null> = new FormControl<string>('');

  /** list of banks filtered by search keyword */
  public filteredBanksMulti: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('multiSelect', { static: true })
  multiSelect!: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private FilterService: FilterService) { }


  ngOnInit(): void {

    this.bankMultiCtrl.setValue([]);

    // load the initial bank list
    this.filteredBanksMulti.next(this.banks.slice());

    // listen for search field value changes
    this.bankMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }

  
  protected filterBanksMulti() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredBanksMulti.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.banks.filter(bank => bank.value.toLowerCase().indexOf(search!) > -1)
    );
  }


}
