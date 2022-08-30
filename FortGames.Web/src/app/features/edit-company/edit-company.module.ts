import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCompanyComponent } from './edit-company.component';
import { EditCompanyDialogComponent } from './edit-company-dialog/edit-company-dialog.component';



@NgModule({
  declarations: [
    EditCompanyComponent,
    EditCompanyDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EditCompanyModule { }
