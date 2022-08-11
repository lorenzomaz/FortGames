import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company, Game, Genre, Mode, Platform } from 'src/app/models/interfaces/game.interface';

@Component({
  selector: 'app-edit-games-dialog',
  templateUrl: './edit-games-dialog.component.html',
  styleUrls: ['./edit-games-dialog.component.scss']
})
export class EditGamesDialogComponent implements OnInit {
  editGameForm: FormGroup;
  // public errorMessages: Array<any> = [];

  genres: Genre[] = [];
  companies: Company[] = [];
  platforms: Platform[] = [];
  modes: Mode[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditGamesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Game
  ) {
    this.editGameForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      logo: new FormControl({ value: null, disabled: true }, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      release: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required]),
      companyId: new FormControl(null, [Validators.required]),
      company: new FormControl({ value: null, disabled: true }, [Validators.required]),
      modes: new FormControl(null, [Validators.required]),
      platforms: new FormControl(null, [Validators.required]),
      genres: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {

    this.editGameForm.setValue(this.data);

    // const genres = this.gamesService.getGenres();
    // const companies = this.gamesService.getCompanies();
    // const modes = this.gamesService.getModes();
    // const platforms = this.gamesService.getPlatforms();

  }

  onSubmit() {
    if (this.editGameForm.valid) {
      this.dialogRef.close(this.editGameForm.getRawValue());
    }
  }
}
