import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GamesService } from 'src/app/providers/services/games.service';
import { Game, Platform, Genre, Company, Mode } from 'src/app/models/interfaces/game.interface';
import { MatChip, MatChipInputEvent } from '@angular/material/chips';
import { Chip } from 'src/app/models/interfaces/chips.interface';
import { MatTableDataSource } from '@angular/material/table';
import { TableParameters } from 'src/app/models/interfaces/table-paramenters.interface';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';


@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  searchForm = new FormGroup({
    title: new FormControl('')
  })

  platforms: Platform[] = [];
  chips: any[] = [];

  dataSource!: MatTableDataSource<Game>;
  displayedColumns: string[] = ['Logo', 'Title', 'Release', 'Rating', 'Platforms'];

  pageSizeOptions = [5, 10, 25, 1000, 20000];
  params: TableParameters = { index: 0, size: 25};
  filter$ = new Subject<string>();
  total: number = 0;
  filteredData: any;
  value = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {

    this.getPlatforms();
    this.getGamesList();

    this.filter$.pipe(
      debounceTime(300),
      distinctUntilChanged()
      ).subscribe(value => {
        this.params.search = value;
        // this.paginator.firstPage();
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
    this.gamesService.getGamesList(this.params).subscribe({
      next: (r) => {
        this.dataSource = new MatTableDataSource<Game>(r.results);
        this.total = r.total;
        console.log(r);
        this.filteredData = this.dataSource.filteredData;
        console.log(this.dataSource.filteredData);
      },
      error: (e: Error) => console.log(e)
    })
  }

  onSubmit() {
    console.log(this.searchForm.value.title);
    this.searchForm.setValue({ title: '' });
  }

  getPlatforms() {
    this.gamesService.getPlatforms().subscribe({
      next: (r: Platform[]) => {
        this.platforms = r;
      }
    })
  }

  toggle(chip: MatChip) {
    chip.toggleSelected();
    this.chips.push(chip.value);
  }

  remove(chip: Chip): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  // Fork join

}
