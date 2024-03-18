import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiContentProjectionComponent } from './multi-content-projection.component';

describe('MultiContentProjectionComponent', () => {
  let component: MultiContentProjectionComponent;
  let fixture: ComponentFixture<MultiContentProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiContentProjectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiContentProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
