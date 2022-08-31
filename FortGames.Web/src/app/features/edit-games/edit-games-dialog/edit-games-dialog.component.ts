import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, takeUntil } from 'rxjs';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { Company, Game, Genre, Mode, Platform } from 'src/app/models/interfaces/game.interface';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-edit-games-dialog',
  templateUrl: './edit-games-dialog.component.html',
  styleUrls: ['./edit-games-dialog.component.scss']
})
export class EditGamesDialogComponent extends UnsubscriptionHandler implements OnInit {

  public errorMessages: Array<any> = [];

  editGameForm: FormGroup;

  genres: Genre[] = [];
  companies: Company[] = [];
  platforms: Platform[] = [];
  modes: Mode[] = [];

  constructor(
    private gamesService: GamesService,
    private dialogRef: MatDialogRef<EditGamesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Game
  ) {
    super();

    this.editGameForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      logo: new FormControl(null, [Validators.required]),
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
      },
      complete: () => {
        const genresIds = this.data.genres.map(g => g.id);
        const modesIds = this.data.modes.map(m => m.id);
        const platformsIds = this.data.platforms.map(p => p.id);

        this.data.genres = this.genres.filter(g => genresIds.includes(g.id));
        this.data.modes = this.modes.filter(m => modesIds.includes(m.id));
        this.data.platforms = this.platforms.filter(p => platformsIds.includes(p.id));

        this.editGameForm.setValue(this.data); //metterlo dopo lo statement perchè i file non sono ancora caricati. Va fatto dopo aver finito. Dev'essere l'istanza non la chiamata
      }
    });

  }

  onSubmit() {
    if (this.editGameForm.valid) {
      this.dialogRef.close(this.editGameForm.getRawValue());
    }
  }
}
