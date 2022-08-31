import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AddPlatformComponent } from './add-platform.component';



@NgModule({
  declarations: [
    AddPlatformComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: AddPlatformComponent }
    ])
  ]
})
export class AddPlatformModule { }
