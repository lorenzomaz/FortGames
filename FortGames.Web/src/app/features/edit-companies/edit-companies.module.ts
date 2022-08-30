import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCompaniesComponent } from './edit-companies.component';
import { EditCompaniesDialogComponent } from './edit-companies-dialog/edit-companies-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    EditCompaniesComponent,
    EditCompaniesDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: EditCompaniesComponent }
    ]),
    MaterialModule
  ]
})
export class EditCompaniesModule { }
