import {
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { FilterService } from '../../../shared/services/filter.service'
import { BehaviorSubject, Subscription } from 'rxjs'
import { DataSource } from '@angular/cdk/collections'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { ELEMENT_DATA, PeriodicElement } from '../../../shared/services/data'
import { ChangeDetectorRef } from '@angular/core'
import { TabService } from '../../../shared/services/currentStatus.service'
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group'
import { DashboardService } from '../../dashboard.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnChanges, OnInit {
  activeRoute: ActivatedRoute = inject(ActivatedRoute)

  getRecord(data: any): void {
    console.log(data.id)
    let queryParams: any = {}
    queryParams['id'] = data.id // Create a dictionary containing the query parameter
    this.router.navigate(['landing'], {
      queryParams: queryParams,
    })
  }

  ngOnInit(): void {
    this.dashBoardService.getAppointmentTotalList().subscribe((data) => {
      console.log(data.data[0].service_list)

      this.setTableValue(data)

      console.log('ngOninit is called')
    })
  }

  setTableValue(data: {
    data: { service_list: MatTableDataSource<PeriodicElement> }[]
  }) {
    this.filteredDataSource = data.data[0].service_list
    this.dataSource = data.data[0].service_list
  }

  filteredDataSubject = new BehaviorSubject<PeriodicElement[]>([])

  displayedColumns: string[] = [
    'status',
    'prefDate',
    'id',
    'name',
    'reqDate',
    'speciality',
    'visitType',
  ]

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
  filteredDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
  currentStatus = ''

  filterSubscription: Subscription
  filterSubscriptionSpeciality: Subscription
  filterSubscriptionVisit: Subscription
  filterSubscriptionSearch: Subscription

  constructor(
    private tabService: TabService,
    private filterService: FilterService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private dashBoardService: DashboardService
  ) {
    this.filterSubscription = this.filterService.filterChanged$.subscribe(
      (filter) => {
        this.applyStatusFilter(filter)
      }
    )

    this.filterSubscriptionSpeciality =
      this.filterService.filterChangedSpeciality$.subscribe((filter) => {
        this.applySpecialityFilter(filter)
      })

    this.filterSubscriptionVisit =
      this.filterService.filterChangedVisit$.subscribe((filter) => {
        this.applyVisitFilter(filter)
      })

    this.filterSubscriptionSearch =
      this.filterService.filterChangedSearch$.subscribe((filter) => {
        this.applySearchFilter(filter)
      })
  }

  // ngDoCheck(): void {
  //   this.filteredDataSource.paginator = this.paginator
  //   this.cdRef.detectChanges()

  //   console.log('ng do check is called')
  // }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterSubscription = this.filterService.filterChanged$.subscribe(
      (filter) => {
        this.applyStatusFilter(filter)
      }
    )

    this.filterSubscriptionSpeciality =
      this.filterService.filterChangedSpeciality$.subscribe((filter) => {
        this.applySpecialityFilter(filter)
      })

    this.filterSubscriptionVisit =
      this.filterService.filterChangedVisit$.subscribe((filter) => {
        this.applyVisitFilter(filter)
      })
  }

  applySearchFilter(searchValue: string) {
    console.log('type of searchValue is : ' + typeof searchValue)
    console.log('SearchValue is : ' + searchValue)
    console.log('SearchValue length is : ' + searchValue.length)

    this.filteredDataSource.data = this.dataSource.data.filter(
      (o) => o.id.toLowerCase == searchValue.trim().toLowerCase
    )
    this.filteredDataSource._updateChangeSubscription()
    this.cdRef.detectChanges()
    // this.filteredDataSource.filter = searchValue
    // console.log("Filter applied with searchValue  : " + searchValue )
  }

  applyStatusFilter(filterValue: string) {
    if (filterValue.toLowerCase() == 'total request') {
      // If 'Total Request', show the complete data without filtering
      this.filteredDataSource.data = this.dataSource.data
      this.filteredDataSource.filter = ''
      this.cdRef.detectChanges()
    } else {
      // Otherwise, apply the filter
      filterValue = filterValue.trim().toLowerCase()

      // Filter the data
      const filteredData = this.dataSource.data.filter((item) =>
        item.status.toLowerCase().includes(filterValue)
      )

      // Update the filteredDataSource with the filtered data
      this.filteredDataSource.data = filteredData
      this.filteredDataSource.filter = filterValue
      this.cdRef.detectChanges()
    }

    this.cdRef.detectChanges()
  }

  applySpecialityFilter(specialities: any) {
    const selectedSpecialities = specialities.map(
      (item: { value: any }) => item.value
    )

    this.filteredDataSource.filterPredicate = (
      data: PeriodicElement,
      filter: string
    ) => {
      const selectedValues = filter.split(',')
      return selectedValues.includes(data.speciality.trim())
    }

    const filteredData = this.dataSource.data.filter((item) =>
      specialities.some(
        (speciality: { value: string }) => item.speciality === speciality.value
      )
    )

    this.filteredDataSource.filter = selectedSpecialities.join(',')
    this.cdRef.detectChanges()

    this.filteredDataSource.data = this.filteredDataSource.filteredData

    this.cdRef.detectChanges()

    // setTimeout(() => {
    //   // Access the filtered data after the filter is applied
    //   const filteredData = this.filteredDataSource.filteredData;
    //   console.log(filteredData);

    // }, 0);
  }

  applyVisitFilter(specialities: any) {
    const selectedSpecialities = specialities.map(
      (item: { value: any }) => item.value
    )

    // Custom filter predicate
    this.filteredDataSource.filterPredicate = (
      data: PeriodicElement,
      filter: string
    ) => {
      const selectedValues = filter.split(',')
      return selectedValues.includes(data.visitType.trim())
    }

    const filteredDataSource = this.dataSource.data.filter((item) =>
      specialities.some(
        (speciality: { value: string }) =>
          item.visitType.toLowerCase() === speciality.value.toLowerCase()
      )
    )

    // Update the filteredDataSource with the filtered data

    this.filteredDataSource.filter = selectedSpecialities.join(',')
    this.cdRef.detectChanges()

    this.filteredDataSource.data = this.filteredDataSource.filteredData

    this.cdRef.detectChanges()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.filteredDataSource.paginator = this.paginator
    this.cdRef.detectChanges()
    console.log('ng afterView init called')
  }
}
