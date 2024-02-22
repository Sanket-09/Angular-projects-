import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FilterService } from '../../services/filter.service';
import { Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { ELEMENT_DATA, PeriodicElement } from '../../services/data';
import { ChangeDetectorRef } from '@angular/core';
import { TabService } from '../../services/currentStatus.service';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';

 

 
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit , OnChanges {


  activeRoute: ActivatedRoute = inject(ActivatedRoute);


  getRecord(data: any) : void {
    console.log(data.id);
    let queryParams : any = {};
    queryParams['id'] = data.id; // Create a dictionary containing the query parameter
    this.router.navigate(['landing'], { 
      queryParams: queryParams 
    });
  }

  
 
  displayedColumns: string[] = ['status', 'prefDate', 'id', 'name', 'reqDate', 'speciality', 'visitType'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  filteredDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  currentStatus = ''
 
  filterSubscription: Subscription;
  filterSubscriptionSpeciality: Subscription;
  filterSubscriptionVisit: Subscription;
  // filterSubscriptionSearch : Subscription;
 
  constructor(private tabService: TabService, private filterService: FilterService, private router: Router , private cdRef: ChangeDetectorRef) {
 
    this.filterSubscription = this.filterService.filterChanged$.subscribe(filter => {
      this.applyStatusFilter(filter);
    })
 
    this.filterSubscriptionSpeciality = this.filterService.filterChangedSpeciality$.subscribe(filter => {
      this.applySpecialityFilter(filter);
      
      
    })

    this.filterSubscriptionVisit = this.filterService.filterChangedVisit$.subscribe(filter => {
      this.applyVisitFilter(filter);
      console.log('visit filter called in constructor table')
    })
    

    // this.filterSubscriptionSearch = this.filterService.filterChangedSearch$.subscribe(filter => {
    //   this.applySearchFilter(filter);
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterSubscription = this.filterService.filterChanged$.subscribe(filter => {
      this.applyStatusFilter(filter);
    })
 
    this.filterSubscriptionSpeciality = this.filterService.filterChangedSpeciality$.subscribe(filter => {
      this.applySpecialityFilter(filter);
      
    })

    this.filterSubscriptionVisit = this.filterService.filterChangedVisit$.subscribe(filter => {
      this.applyVisitFilter(filter);
      
    })

    console.log("ngOnChange is called")

    
  }


  // applySearchFilter(searchValue : string){
  //   console.log("type of searchValue is : "  + typeof searchValue);
  //   console.log("SearchValue is : "  + searchValue);
  //   console.log("SearchValue length is : "  + searchValue.length);
    
  //   this.filteredDataSource.data=this.dataSource.data.filter(o=>
  //     o.id.toLowerCase==searchValue.trim().toLowerCase
  //   )
  //   this.filteredDataSource._updateChangeSubscription();
  //   // this.cdRef.detectChanges();
  //   this.filteredDataSource.filter = searchValue
  //   console.log("Filter applied with searchValue  : " + searchValue )
  // }

 
  applyStatusFilter(filterValue: string) {

    console.log(filterValue)
    if (filterValue.toLowerCase() == 'total request') {
      // If 'Total Request', show the complete data without filtering
      this.filteredDataSource.data = this.dataSource.data;
      this.filteredDataSource.filter = '';
    } else {
      // Otherwise, apply the filter
      filterValue = filterValue.trim().toLowerCase();
    
      // Filter the data
      const filteredData = this.dataSource.data.filter((item) => item.status.toLowerCase().includes(filterValue));
  
      // Update the filteredDataSource with the filtered data
      this.filteredDataSource.data = filteredData;
      this.filteredDataSource.filter = filterValue;
    }
    // Trigger the filter method to update the MatTable
    console.log(this.filteredDataSource.data);
    this.cdRef.detectChanges();
  }
 
  applySpecialityFilter(specialities: any) {

    
    
      console.log(specialities)
    const selectedSpecialities = specialities.map((item: { value: any }) => item.value);
    console.log( " before predicate  :"  + selectedSpecialities );
    
    // Custom filter predicate
    this.filteredDataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      const selectedValues = filter.split(','); 
      return selectedValues.includes(data.speciality.trim()); 
    };

    const filteredData = this.dataSource.data.filter(item =>
      specialities.some((speciality: { value: string; }) => item.speciality.toLowerCase() === speciality.value.toLowerCase())
    );
    
    
    this.filteredDataSource.filter = selectedSpecialities.join(','); 

    console.log(this.filteredDataSource.data);
    this.cdRef.detectChanges();
    

    
    
  }

  applyVisitFilter(specialities: any) {


    
  console.log(specialities)
  const selectedSpecialities = specialities.map((item: { value: any }) => item.value);
  console.log( " before predicate  :"  + selectedSpecialities );
  
  // Custom filter predicate
  this.filteredDataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
    const selectedValues = filter.split(','); 
    return selectedValues.includes(data.visitType.trim()); 
  };

  const filteredData = this.dataSource.data.filter(item =>
    specialities.some((speciality: { value: string; }) => item.visitType.toLowerCase() === speciality.value.toLowerCase())
  );
  
  
  this.filteredDataSource.filter = selectedSpecialities.join(','); 

  console.log(this.filteredDataSource.data);
  this.cdRef.detectChanges();
  

  
  
}

 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  ngAfterViewInit() {
    this.filteredDataSource.paginator = this.paginator;
    this.cdRef.detectChanges();

    

    console.log("ngAfterViewInit is called")
  }
}
