import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

import { AddModeComponent } from './add-mode.component';


@NgModule({
  declarations: [
    AddModeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AddModeComponent }
    ]),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AddModeModule { }
