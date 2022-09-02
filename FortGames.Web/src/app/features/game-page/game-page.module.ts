import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';

import { GamePageComponent } from './game-page.component';



@NgModule({
  declarations: [
    GamePageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: ':id', component: GamePageComponent }
    ])
  ]
})
export class GamePageModule { }
