import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';

import { EditGamesDialogComponent } from './edit-games-dialog/edit-games-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditGamesComponent } from './edit-games.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    EditGamesComponent,
    EditGamesDialogComponent,
    ConfirmDialogComponent
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
