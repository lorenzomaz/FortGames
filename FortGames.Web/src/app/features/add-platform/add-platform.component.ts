import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getApiValidationErrors } from 'src/app/models/utilities';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-add-platform',
  templateUrl: './add-platform.component.html',
  styleUrls: ['./add-platform.component.scss']
})
export class AddPlatformComponent {

  public errorMessages: Array<any> = [];

  platForm = new FormGroup({
    name: new FormControl(null, [Validators.required])
  })

  constructor(private gamesService: GamesService, private router: Router) { }

  addPlatform() {
    this.gamesService.addPlatform({
      id: 0,
      name: this.platForm.value.name!,
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
