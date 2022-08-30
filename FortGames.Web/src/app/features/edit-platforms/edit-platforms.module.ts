import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPlatformsComponent } from './edit-platforms.component';
import { EditPlatformsDialogComponent } from './edit-platforms-dialog/edit-platforms-dialog.component';



@NgModule({
  declarations: [
    EditPlatformsComponent,
    EditPlatformsDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EditPlatformsModule { }
