import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPlatformsComponent } from './edit-platforms.component';
import { EditPlatformsDialogComponent } from './edit-platforms-dialog/edit-platforms-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    EditPlatformsComponent,
    EditPlatformsDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: EditPlatformsComponent }
    ])
  ]
})
export class EditPlatformsModule { }
