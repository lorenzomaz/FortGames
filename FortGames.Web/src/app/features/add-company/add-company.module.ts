import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

import { AddCompanyComponent } from './add-company.component';


@NgModule({
  declarations: [
    AddCompanyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AddCompanyComponent }
    ]),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AddCompanyModule { }
