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
import { BehaviorSubject, Subscription, filter } from 'rxjs'
import { DataSource } from '@angular/cdk/collections'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'

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

  speicialityMapId: any

  getRecord(data: any): void {
    console.log(data.id)
    let queryParams: any = {}
    queryParams['id'] = data.id // Create a dictionary containing the query parameter
    this.router.navigate(['landing'], {
      queryParams: queryParams,
    })
  }

  ngOnInit(): void {
    this.dashBoardService
      .getAppointmentTotalList({
        currentStatus: 'total',
      })
      .subscribe((data) => {
        console.log(data.data[0].service_list)

        // Initialize data sources
        this.dataSource = new MatTableDataSource(data.data[0].service_list)
        this.filteredDataSource = new MatTableDataSource(
          data.data[0].service_list
        )

        // Set table value
        this.setTableValue(data)

        console.log('ngOnInit is called')

        // Set paginator for filteredDataSource
        this.filteredDataSource.paginator = this.paginator
      })

    this.dashBoardService.getSpecialityMapId().subscribe((data) => {
      console.log(data.data)
      this.speicialityMapId = data.data
    })
  }

  setTableValue(data: { data: { service_list: any }[] }) {}

  filteredDataSubject = new BehaviorSubject<any>([])

  displayedColumns: string[] = [
    'status',
    'prefDate',
    'id',
    'name',
    'reqDate',
    'speciality',
    'visitType',
  ]

  dataSource = new MatTableDataSource<any>()
  filteredDataSource = new MatTableDataSource<any>()

  currentStatus = ''

  filterSubscription: Subscription
  filterSubscriptionSpeciality: Subscription
  filterSubscriptionCategory: Subscription
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

    this.filterSubscriptionCategory =
      this.filterService.filterChangedCategory$.subscribe((filter) => {
        this.applyCategoryFilter(filter)
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

  applySearchFilter(searchValue: string) {}

  applyStatusFilter(filterValue: string) {
    if (filterValue == 'Total Request') filterValue = 'total'

    let response = this.dashBoardService.getAppointmentTotalList({
      currentStatus: filterValue.toLowerCase(),
    })

    response.subscribe((data) => {
      console.log(data)

      // Update the data property of filteredDataSource
      this.filteredDataSource.data = data.data[0].service_list

      console.log('paginator is called')
      this.filteredDataSource.paginator = this.paginator
    })
  }

  applySpecialityFilter(specialities: any) {
    const selectedSpecialities = specialities.map(
      (item: { name: any }) => item.name
    )

    console.log(selectedSpecialities)

    let response = this.dashBoardService.getAppointmentTotalList({
      currentCategory: selectedSpecialities,
    })

    response.subscribe((data) => {
      console.log('API Response:', data)
      // Rest of the code
      this.filteredDataSource.data = data.data[0].service_list
      this.filteredDataSource.paginator = this.paginator
    })

    // response.subscribe((data) => {

    //   this.filteredDataSource.data = data.data[0].service_list
    //   this.filteredDataSource.paginator = this.paginator
    // })

    // setTimeout(() => {
    //   // Access the filtered data after the filter is applied
    //   const filteredData = this.filteredDataSource.filteredData;
    //   console.log(filteredData);

    // }, 0);
  }

  applyCategoryFilter(specialities: any) {
    const selectedSpecialities = specialities.map(
      (item: { name: any }) => item.name
    )

    console.log(selectedSpecialities)

    const mappingObject: any = {}
    this.speicialityMapId.forEach((obj: any) => {
      mappingObject[obj.name] = obj.id
    })

    console.log('mapping object created ', mappingObject)

    const mapIdData: any[] = []

    const mapId = specialities.map((data: any) => {
      mapIdData.push(parseInt(mappingObject[data.name]))
    })

    console.log('id array is called', mapIdData)

    let response = this.dashBoardService.getAppointmentTotalList({
      currentSpeciality: mapIdData,
    })

    response.subscribe((data) => {
      console.log('API Response:', data)
      // Rest of the code
      this.filteredDataSource.data = data.data[0].service_list
      this.filteredDataSource.paginator = this.paginator
    })

    // response.subscribe((data) => {

    //   this.filteredDataSource.data = data.data[0].service_list
    //   this.filteredDataSource.paginator = this.paginator
    // })

    // setTimeout(() => {
    //   // Access the filtered data after the filter is applied
    //   const filteredData = this.filteredDataSource.filteredData;
    //   console.log(filteredData);

    // }, 0);
  }

  applyVisitFilter(specialities: any) {
    console.log('visit filter called')

    const selectedSpecialities = specialities.map(
      (item: { value: any }) => item.value
    )

    console.log(selectedSpecialities)

    let response = this.dashBoardService.getAppointmentTotalList({
      currentVisitType: selectedSpecialities,
    })

    response.subscribe((data) => {
      console.log('API Response:', data)
      // Rest of the code
      this.filteredDataSource.data = data.data[0].service_list
      this.filteredDataSource.paginator = this.paginator
    })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.filteredDataSource.paginator = this.paginator

    this.cdRef.detectChanges()
    console.log('ng afterView init called')
  }
}
