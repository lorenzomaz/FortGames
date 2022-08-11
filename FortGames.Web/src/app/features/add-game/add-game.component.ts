import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { Router } from '@angular/router';
import { forkJoin, takeUntil } from 'rxjs';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { Company, Genre, Mode, Platform } from 'src/app/models/interfaces/game.interface';
import { getApiValidationErrors } from 'src/app/models/utilities';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})

export class AddGameComponent extends UnsubscriptionHandler implements OnInit {

  public errorMessages: Array<any> = [];

  genres: Genre[] = [];
  companies: Company[] = [];
  platforms: Platform[] = [];
  modes: Mode[] = [];

  animationDuration: string = "1000";
  buttonDisabled: boolean = true;

  formStep1 = this._fb.group({
    title: new FormControl(null, [Validators.required]),
    release: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    rating: new FormControl(null, [Validators.required]),
    companyId: new FormControl(null, [Validators.required])
  });

  formStep2 = this._fb.group({
    logo: new FormControl(null, [Validators.required])
  });

  formStep3 = this._fb.group({
    genres: new FormControl(null, [Validators.required]),
    modes: new FormControl(null, [Validators.required]),
    platforms: new FormControl(null, [Validators.required])
  });

  constructor(private _fb: FormBuilder, private gamesService: GamesService, private router: Router) {
    super();
  }

  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value) + '!';
    }

    return value;
  }

  togglePlatform(chip: MatChip) {
    chip.toggleSelected();
  }

  ngOnInit(): void {


    const genres = this.gamesService.getGenres();
    const companies = this.gamesService.getCompanies();
    const modes = this.gamesService.getModes();
    const platforms = this.gamesService.getPlatforms();

    forkJoin([genres, companies, modes, platforms]).pipe(takeUntil(this.destroy$)).subscribe({
      next: results => {
        this.genres = results[0];
        this.companies = results[1];
        this.modes = results[2];
        this.platforms = results[3];
      }
    });

    if (this.formStep1.valid === true && this.formStep2.valid === true && this.formStep3.valid === true) this.buttonDisabled = false;

  }

  getCompany(id: number) {
    if (id) {
      const company = this.companies.find(c => c.id === id);
      return company?.name;
    }
    return null;
  }
  getGenres(genres: any) {
    if (Array.isArray(genres)) {
      return genres.map((g: Genre) => g.name).join(', ');
    }
    return null;
  }
  getModes(modes: any) {
    if (Array.isArray(modes)) {
      return modes.map((m: Mode) => m.name).join(', ');
    }
    return null;
  }
  getPlatforms(platforms: any) {
    if (Array.isArray(platforms)) {
      return platforms.map((p: Platform) => p.name).join(', ');
    }
    return null;
  }

  onSubmit() {
    console.log({ ...this.formStep1.value, ...this.formStep2.value, ...this.formStep3.value })

    this.gamesService.addGame({
      title: this.formStep1.value.title!,
      release: this.formStep1.value.release!,
      description: this.formStep1.value.description!,
      rating: this.formStep1.value.rating!,
      companyId: this.formStep1.value.companyId!,
      // logo: this.formStep2.value.logo!,
      genres: this.formStep3.value.genres!,
      modes: this.formStep3.value.modes!,
      platforms: this.formStep3.value.platforms!
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
