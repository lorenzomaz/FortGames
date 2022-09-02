import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

import { AddGameComponent } from './add-game.component';

@NgModule({
  declarations: [
    AddGameComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AddGameComponent }
    ]),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AddGameModule { }
