import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialsPublishedComponent } from './tutorials-published.component';

describe('TutorialsPublishedComponent', () => {
  let component: TutorialsPublishedComponent;
  let fixture: ComponentFixture<TutorialsPublishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialsPublishedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialsPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
