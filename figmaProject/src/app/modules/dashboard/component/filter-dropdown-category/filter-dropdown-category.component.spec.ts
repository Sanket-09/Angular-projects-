import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDropdownCategoryComponent } from './filter-dropdown-category.component';

describe('FilterDropdownCategoryComponent', () => {
  let component: FilterDropdownCategoryComponent;
  let fixture: ComponentFixture<FilterDropdownCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterDropdownCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterDropdownCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
