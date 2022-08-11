import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Company, Game, Genre, Mode, Platform } from 'src/app/models/interfaces/game.interface';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-edit-games',
  templateUrl: './edit-games.component.html',
  styleUrls: ['./edit-games.component.scss']
})
export class EditGamesComponent implements OnInit {
  displayedColumns: Array<string> = ['title', 'release', 'description', 'rating', 'companyId', 'modes', 'platforms', 'genres', 'actions'];
  dataSource!: MatTableDataSource<Game>;
  form: FormGroup;

  genres: Genre[] = [];
  companies: Company[] = [];
  platforms: Platform[] = [];
  modes: Mode[] = [];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _liveAnnouncer: LiveAnnouncer, private gamesService: GamesService, public dialog: MatDialog) {
    this.form = new FormGroup({
      lCount: new FormControl(1, [Validators.required])
    });
   }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.gamesService.getGames().subscribe({ //se non funziona, provare con getGamesList
      next: (r: Game[]) => {
        this.dataSource = new MatTableDataSource<Game>(r);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
