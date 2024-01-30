import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})

export class AddItemComponent implements OnInit {
toggleShowMain() {
this.showMain = !this.showMain;
} 
  todayDate: Date = new Date();
  showMain:boolean = false;
  newItemForm!: FormGroup;
  gridItems!: any[];

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit() {

    this.dataService.gridItems$.subscribe((items) => {
    
      this.gridItems = items ? [...items] : [];
      console.log(this.gridItems);
 
    });
   
    this.newItemForm = this.fb.group({
      id: [''],
      image: ['', [Validators.required]],
      addedBy: ['', [Validators.required]],
      createdDate: ['', [Validators.required]],
      marketingRights: ['', [Validators.required]],
    });
  }


  onSubmit() {
    if (this.newItemForm.valid) {
      this.newItemForm.value['id'] = this.gridItems.length;
      const newItem = this.newItemForm.value;
      
      this.dataService.addGridItem(newItem);
      alert("Item Added Successfully")
      this.newItemForm.reset();
      
    }

    else
    {
      alert("Please fill all the fields");
    }
    
  

  }
}
