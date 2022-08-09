import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { forkJoin, takeUntil } from 'rxjs';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { Company, Genre, Mode, Platform } from 'src/app/models/interfaces/game.interface';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})

export class AddGameComponent extends UnsubscriptionHandler implements OnInit {

  genres: Genre[] = [];
  companies: Company[] = [];
  platforms: Platform[] = [];
  modes: Mode[] = [];

  animationDuration: string = "1000";

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

  constructor(private _fb: FormBuilder, private gamesService: GamesService) {
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
  }

  onSubmit() {
    console.log({...this.formStep1.value, ...this.formStep2.value, ...this.formStep3.value})
  }
}
