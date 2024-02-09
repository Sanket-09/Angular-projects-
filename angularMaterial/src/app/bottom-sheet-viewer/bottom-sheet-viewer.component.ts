import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-bottom-sheet-viewer',
  templateUrl: './bottom-sheet-viewer.component.html',
  styleUrls: ['./bottom-sheet-viewer.component.scss']
})
export class BottomSheetViewerComponent {

  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetViewerSheet);
    
  }

}

@Component({
  selector: './bottom-sheet-viewer-sheet',
  templateUrl: './bottom-sheet-viewer-sheet.html',
})
export class BottomSheetViewerSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetViewerSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
