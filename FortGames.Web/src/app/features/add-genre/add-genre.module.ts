import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGenreComponent } from './add-genre.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    AddGenreComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AddGenreComponent }
    ]),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AddGenreModule { }
