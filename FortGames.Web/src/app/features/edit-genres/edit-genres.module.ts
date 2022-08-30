import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditGenresComponent } from './edit-genres.component';
import { EditGenresDialogComponent } from './edit-genres-dialog/edit-genres-dialog.component';



@NgModule({
  declarations: [
    EditGenresComponent,
    EditGenresDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EditGenresModule { }
