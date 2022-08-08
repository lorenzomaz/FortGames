import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { Company, Genre, Mode, Platform } from 'src/app/models/interfaces/game.interface';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})

export class AddGameComponent implements OnInit {

  genres: Genre[] = [];
  companies: Company[] = [];
  platforms: Platform[] = [];
  modes: Mode[] = [];

  constructor(private _formBuilder: FormBuilder, private gamesService: GamesService) { }
  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });
  animationDuration: string = "1000";

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
    this.getGenres();
    this.getCompanies();
    this.getModes();
    this.getPlatforms();
  }

  getGenres() {
    this.gamesService.getGenres().subscribe({
      next: (r: Genre[]) => (this.genres = r)
    })
  }
  getCompanies() {
    this.gamesService.getCompanies().subscribe({
      next: (r: Company[]) => (this.companies = r)
    })
  }
  getModes() {
    this.gamesService.getModes().subscribe({
      next: (r: Mode[]) => (this.modes = r)
    })
  }
  getPlatforms() {
    this.gamesService.getPlatforms().subscribe({
      next: (r: Platform[]) => (this.platforms = r)
    })
  }
}
