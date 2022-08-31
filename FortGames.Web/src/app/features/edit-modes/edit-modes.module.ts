import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditModesComponent } from './edit-modes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

import { EditModesDialogComponent } from './edit-modes-dialog/edit-modes-dialog.component';

@NgModule({
  declarations: [
    EditModesComponent,
    EditModesDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: EditModesComponent }
    ]),
    MaterialModule
  ]
})
export class EditModesModule { }
