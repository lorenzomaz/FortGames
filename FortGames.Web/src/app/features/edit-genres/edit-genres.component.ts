import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { Genre } from 'src/app/models/interfaces/game.interface';
import { PagedResponse } from 'src/app/models/interfaces/paged-response';
import { TableParameters } from 'src/app/models/interfaces/table-paramenters.interface';
import { GamesService } from 'src/app/providers/services/games.service';
import { EditGenresDialogComponent } from './edit-genres-dialog/edit-genres-dialog.component';

@Component({
  selector: 'app-edit-genres',
  templateUrl: './edit-genres.component.html',
  styleUrls: ['./edit-genres.component.scss']
})
export class EditGenresComponent extends UnsubscriptionHandler implements OnInit {

  displayedColumns: Array<string> = ['id', 'name', 'description', 'actions'];
  dataSource!: MatTableDataSource<Genre>;
  totalGenres: number = 0;
  params: TableParameters = { index: 0, size: 10 };
  filter$ = new Subject<string>();
  form: FormGroup;

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
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.params.search = value;
      this.paginator.firstPage();
      this.getGenres();
    });

    this.getGenres();
  }

  getGenres() {
    this.gamesService.getGenreList(this.params).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: PagedResponse<Genre>) => {
        this.dataSource = new MatTableDataSource<Genre>(result.results);
        this.totalGenres = result.total;
      }
    })
  }

  sortChange(event: Sort) {
    this.params.sortBy = event.active;
    this.params.sortDir = event.direction;
    this.getGenres();
  }

  pageChanged(event: PageEvent) {
    this.params.index = event.pageIndex;
    this.params.size = event.pageSize;
    this.getGenres();
  }

  searchFilter(event: Event) {
    const el = event.target as HTMLInputElement;
    const value = el.value.trim().toLowerCase();
    if (this.params.search !== value)
      this.filter$.next(value);
  }

  removeGenre(genre: Genre) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Genre',
        message: 'Are you sure you want to delete this Genre?'
      }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.gamesService.deleteGenre(genre.id).subscribe({
            next: () => {
              this.getGenres();
            }
          })
        }
      }
    )
  }

  editGenre(genre: Genre) {
    this.dialog.open(EditGenresDialogComponent, {
      data: { ...genre }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.gamesService.updateGenre(result).subscribe({
          next: () => {
            this.getGenres()
          },
          error: (error: Error) => console.log(error)
        })
      }
    })
  }
}
