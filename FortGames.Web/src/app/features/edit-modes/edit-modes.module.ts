import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditModesComponent } from './edit-modes.component';
import { EditModesDialogComponent } from './edit-modes-dialog/edit-modes-dialog.component';



@NgModule({
  declarations: [
    EditModesComponent,
    EditModesDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EditModesModule { }
