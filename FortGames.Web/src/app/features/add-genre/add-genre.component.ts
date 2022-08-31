import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { _MatTabGroupBase } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { getApiValidationErrors } from 'src/app/models/utilities';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss']
})
export class AddGenreComponent {

  public errorMessages: Array<any> = [];

  genreForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required])
  })

  constructor(private gamesService: GamesService, private router: Router) { }

  addGenre() {
    this.gamesService.addGenre({
      id: 0,
      name: this.genreForm.value.name!,
      description: this.genreForm.value.description!,
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
