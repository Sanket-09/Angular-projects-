
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
})



export class EditItemComponent implements OnInit {
  item: any;
  itemForm!: FormGroup;
  index!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

      console.log('component initialised');
      this.index = +this.route.snapshot.paramMap.get('index')!;
      
      console.log('Index:', this.index);

     

      if (this.index !== undefined) {
        this.item = this.dataService.getGridItem(this.index) || {};

        // Initialize the form with validators as needed
        this.itemForm = this.fb.group({
          image: [this.item.image, [Validators.required]],
          addedBy: [this.item.addedBy, [Validators.required]],
          createdDate: [this.item.createdDate, [Validators.required]],
          marketingRights: [this.item.marketingRights, [Validators.required]],
        });
      } else {
        console.error('Index is undefined.');
      }

  }

  saveChanges() {
    if (this.index !== undefined) {
  
      const updatedItem = { ...this.itemForm.value };
      this.dataService.updateGridItem(this.index, updatedItem);

      this.router.navigate(['/']);
    } else {
      console.error('Cannot save changes without a valid index.');
    }
  }
}
