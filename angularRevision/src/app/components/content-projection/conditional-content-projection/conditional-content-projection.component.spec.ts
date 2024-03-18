import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalContentProjectionComponent } from './conditional-content-projection.component';

describe('ConditionalContentProjectionComponent', () => {
  let component: ConditionalContentProjectionComponent;
  let fixture: ComponentFixture<ConditionalContentProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionalContentProjectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionalContentProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
