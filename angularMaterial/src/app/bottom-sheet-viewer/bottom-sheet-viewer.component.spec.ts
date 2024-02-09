import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetViewerComponent } from './bottom-sheet-viewer.component';

describe('BottomSheetViewerComponent', () => {
  let component: BottomSheetViewerComponent;
  let fixture: ComponentFixture<BottomSheetViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomSheetViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
