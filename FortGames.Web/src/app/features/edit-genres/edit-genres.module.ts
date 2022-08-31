import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditGenresComponent } from './edit-genres.component';
import { EditGenresDialogComponent } from './edit-genres-dialog/edit-genres-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EditGenresComponent,
    EditGenresDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: EditGenresComponent }
    ]),
    MaterialModule
  ]
})
export class EditGenresModule { }
