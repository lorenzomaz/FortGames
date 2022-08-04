import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AccountComponent }
    ]),
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AccountModule { }
