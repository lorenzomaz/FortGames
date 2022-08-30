import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditGenreComponent } from './edit-genre.component';
import { EditGenreDialogComponent } from './edit-genre-dialog/edit-genre-dialog.component';



@NgModule({
  declarations: [
    EditGenreComponent,
    EditGenreDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EditGenreModule { }
