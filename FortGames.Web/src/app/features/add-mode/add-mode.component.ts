import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getApiValidationErrors } from 'src/app/models/utilities';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-add-mode',
  templateUrl: './add-mode.component.html',
  styleUrls: ['./add-mode.component.scss']
})
export class AddModeComponent {

  public errorMessages: Array<any> = [];

  modeForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required])
  })

  constructor(private gamesService: GamesService, private router: Router) { }

  addMode() {
    this.gamesService.addMode({
      id: 0,
      name: this.modeForm.value.name!,
      description: this.modeForm.value.description!,
      games: []
    }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessages = getApiValidationErrors(error.error);
      }
    })
  }
}
