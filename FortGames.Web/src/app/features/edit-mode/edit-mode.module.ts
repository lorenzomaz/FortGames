import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditModeComponent } from './edit-mode.component';
import { EditModeDialogComponent } from './edit-mode-dialog/edit-mode-dialog.component';



@NgModule({
  declarations: [
    EditModeComponent,
    EditModeDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EditModeModule { }
