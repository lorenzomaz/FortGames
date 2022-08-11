import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GamesService } from 'src/app/providers/services/games.service';
import { Game, Platform, Genre, Company, Mode } from 'src/app/models/interfaces/game.interface';
import { MatChip, MatChipInputEvent } from '@angular/material/chips';
import { Chip } from 'src/app/models/interfaces/chips.interface';
import { MatTableDataSource } from '@angular/material/table';
import { TableParameters } from 'src/app/models/interfaces/table-paramenters.interface';
import { debounceTime, distinctUntilChanged, forkJoin, Subject, takeUntil } from 'rxjs';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';


@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent extends UnsubscriptionHandler implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  games: Game[] = [];
  platforms: Platform[] = [];
  genres: Genre[] = [];
  modes: Mode[] = [];
  companies: Company[] = [];

  chips: MatChip[] = [];

  dataSource!: MatTableDataSource<Game>;
  displayedColumns: string[] = ['Logo', 'Title', 'Release', 'Rating', 'Platforms'];

  pageSizeOptions = [4, 10, 25, 100];
  params: TableParameters = { index: 0, size: 25 };
  filter$ = new Subject<string>();
  total: number = 0;
  filteredData: Game[] = [];
  value = '';
  status: boolean = false;
  icon: string = 'view_day'

  constructor(private gamesService: GamesService) {
    super();
  }

  ngOnInit(): void {

    this.getGamesList();

    const games = this.gamesService.getGames();
    const genres = this.gamesService.getGenres();
    const modes = this.gamesService.getModes();
    const companies = this.gamesService.getCompanies();
    const platforms = this.gamesService.getPlatforms();

    forkJoin([games, genres, modes, companies, platforms]).pipe(takeUntil(this.destroy$)).subscribe({
      next: results => {
        this.games = results[0];
        this.genres = results[1];
        this.modes = results[2];
        this.companies = results[3];
        this.platforms = results[4];

        for (const item of this.platforms) {
          Object.assign(item, { filter: { id: item.id, type: 0 } });
        }

        for (const item of this.genres) {
          Object.assign(item, { filter: { id: item.id, type: 1 } });
        }

        for (const item of this.modes) {
          Object.assign(item, { filter: { id: item.id, type: 2 } });
        }

        for (const item of this.companies) {
          Object.assign(item, { filter: { id: item.id, type: 3 } });
        }
      }
    });

    this.filter$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(value => {
      this.params.search = value;
      this.paginator.firstPage();
      this.getGamesList();
    })
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (this.params.search !== filterValue)
      this.filter$.next(filterValue);

  }

  sortChange(event: Sort) {
    this.params.sortBy = event.active;
    this.params.sortDir = event.direction;
    this.getGamesList();
  }

  pageChanged(event: PageEvent) {
    this.params.index = event.pageIndex;
    this.params.size = event.pageSize;
    this.getGamesList();
  }

  getGamesList() {
    this.gamesService.getGamesList(this.params, this.chips.map(c => c.value.filter)).subscribe({
      next: (r) => {
        this.dataSource = new MatTableDataSource<Game>(r.results);
        this.total = r.total;
        this.filteredData = this.dataSource.filteredData;
      },
      error: (e: Error) => console.log(e)
    })
  }

  toggle(chip: MatChip) {
    const index = this.chips.indexOf(chip);

    if (!this.chips.includes(chip)) {
      chip.toggleSelected();
      this.chips.push(chip);
    } else if (index >= 0) {
      chip.toggleSelected();
      this.chips.splice(index, 1);
    }

    this.paginator.firstPage();
    this.getGamesList();
  }

  viewEvent() {
    this.status = !this.status;
  }

  iconEvent() {
    this.status == false ? this.icon = 'view_day' : this.icon = 'apps';
  }

}
