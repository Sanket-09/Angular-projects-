import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FilterService } from '../../services/filter.service';
import { Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { ELEMENT_DATA, PeriodicElement } from '../../services/data';

 

 
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {

  activeRoute: ActivatedRoute = inject(ActivatedRoute);


  getRecord(data: any) : void {
    console.log(data.id);
  
    let queryParams : any = {};
    queryParams['id'] = data.id; // Create a dictionary containing the query parameter
    this.router.navigate(['/landing'], { 
      queryParams: queryParams 
    });
  }
 
  displayedColumns: string[] = ['status', 'prefDate', 'id', 'name', 'reqDate', 'speciality', 'visitType'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  currentStatus = ''
 
  filterSubscription: Subscription;
  filterSubscriptionSpeciality: Subscription;
 
  constructor(private filterService: FilterService, private router: Router) {
 
    this.filterSubscription = this.filterService.filterChanged$.subscribe(filter => {
      console.log("event received in the datatable ")
      this.applyStatusFilter(filter);
    })
 
    this.filterSubscriptionSpeciality = this.filterService.filterChangedSpeciality$.subscribe(filter => {
      this.applySpecialityFilter(filter);
      
    })
  }
 
  applyStatusFilter(status: string) {
    if (status === 'Total Request')
      this.dataSource.filter = '';
    else
      this.dataSource.filter = status;


  }
 
  applySpecialityFilter(specialities: any) {
    const selectedSpecialities = specialities.map((item: { value: any }) => item.value);
    console.log( " before predicate  :"  + selectedSpecialities );
    
    // Custom filter predicate
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      const selectedValues = filter.split(','); 
      return selectedValues.includes(data.speciality.trim()); 
    };


    console.log(typeof(selectedSpecialities))
  
    this.dataSource.filter = selectedSpecialities.join(','); 
 
  }
 
  setValueTotal(countTotal: number) {
    this.filterService.totalNo = countTotal;
  }
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
