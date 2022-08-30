import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPlatformComponent } from './edit-platform.component';
import { EditPlatformDialogComponent } from './edit-platform-dialog/edit-platform-dialog.component';



@NgModule({
  declarations: [
    EditPlatformComponent,
    EditPlatformDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EditPlatformModule { }
