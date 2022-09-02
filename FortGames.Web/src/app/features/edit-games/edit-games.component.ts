import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Company, Game, Genre, Mode, Platform } from 'src/app/models/interfaces/game.interface';
import { GamesService } from 'src/app/providers/services/games.service';

import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { EditGamesDialogComponent } from './edit-games-dialog/edit-games-dialog.component';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TableParameters } from 'src/app/models/interfaces/table-paramenters.interface';
import { PagedResponse } from 'src/app/models/interfaces/paged-response';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-edit-games',
  templateUrl: './edit-games.component.html',
  styleUrls: ['./edit-games.component.scss']
})
export class EditGamesComponent extends UnsubscriptionHandler implements OnInit {
  displayedColumns: Array<string> = ['title', 'release', 'description', 'rating', 'companyId', 'modes', 'platforms', 'genres', 'actions'];
  dataSource!: MatTableDataSource<Game>;
  totalGames: number = 0;
  params: TableParameters = { index: 0, size: 10 };
  filter$ = new Subject<string>();
  form: FormGroup;

  chips: MatChip[] = [];

  genres: Genre[] = [];
  companies: Company[] = [];
  platforms: Platform[] = [];
  modes: Mode[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gamesService: GamesService, public dialog: MatDialog) {
    super();

    this.form = new FormGroup({
      lCount: new FormControl(1, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.filter$.pipe(
      debounceTime(500),
      distinctUntilChanged(), //capisce il valore del filtro, scatta solo se i valori sono diversi
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.params.search = value;
      this.paginator.firstPage();
      this.getGames();
    });

    this.getGames();
  }

  //#region Calls
  getGames() {
    this.gamesService.getGamesList(this.params, this.chips.map(c => c.value.filter)).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: PagedResponse<Game>) => {
        this.dataSource = new MatTableDataSource<Game>(result.results);
        this.totalGames = result.total;
      }
    })
  }

  sortChange(event: Sort) {
    this.params.sortBy = event.active;
    this.params.sortDir = event.direction;
    this.getGames();
  }

  pageChanged(event: PageEvent) {
    this.params.index = event.pageIndex;
    this.params.size = event.pageSize;
    this.getGames();
  }

  searchFilter(event: Event) {
    const el = event.target as HTMLInputElement;
    const value = el.value.trim().toLowerCase();
    if (this.params.search !== value)
      this.filter$.next(value);
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
  //#endregion

  removeGame(game: Game) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Game',
        message: 'Would you like to delete this game from the list?'
      }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.gamesService.deleteGame(game.id!).subscribe({
            next: () => {
              this.getGames();
            },
            error: (error: Error) => console.log(error)
          })
        }
      }
    )
  }

  editGame(game: Game) {
    this.dialog.open(EditGamesDialogComponent, {
      data: { ...game }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.gamesService.updateGame(result).subscribe({
            next: () => {
              this.getGames()
            },
            error: (error: Error) => console.log(error)
          })
        }
      }
    )
  }
}
