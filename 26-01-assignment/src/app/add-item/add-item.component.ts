import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  newItemForm!: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit() {
   
    this.newItemForm = this.fb.group({
      index: ['', [Validators.required]],
      image: ['', [Validators.required]],
      addedBy: ['', [Validators.required]],
      createdDate: ['', [Validators.required]],
      marketingRights: ['', [Validators.required]],
    });
  }

  onSubmit() {

    if (this.newItemForm.valid) {
      const newItem = this.newItemForm.value;

      this.dataService.addGridItem(newItem);
   
      this.newItemForm.reset();
    }
  }
}
