import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';

import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditGamesComponent } from './edit-games.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@NgModule({
  declarations: [
    EditGamesComponent,
    EditDialogComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: EditGamesComponent }
    ])
  ]
})
export class EditGamesModule { }
