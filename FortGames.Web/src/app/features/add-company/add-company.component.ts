import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { getApiValidationErrors } from 'src/app/models/utilities';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {
  public errorMessages: Array<any> = [];
  public loading = false;

  companyForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    website: new FormControl(null, [Validators.required])
  })

  constructor(private gamesService: GamesService, private router: Router) { }

  ngOnInit(): void {
  }

  addComp() {
    this.gamesService.addCompany({
      id: 0,
      name: this.companyForm.value.name!,
      description: this.companyForm.value.description!,
      website: this.companyForm.value.website!,
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

