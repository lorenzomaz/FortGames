import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { Mode } from 'src/app/models/interfaces/game.interface';
import { PagedResponse } from 'src/app/models/interfaces/paged-response';
import { TableParameters } from 'src/app/models/interfaces/table-paramenters.interface';
import { GamesService } from 'src/app/providers/services/games.service';
import { EditModesDialogComponent } from './edit-modes-dialog/edit-modes-dialog.component';

@Component({
  selector: 'app-edit-modes',
  templateUrl: './edit-modes.component.html',
  styleUrls: ['./edit-modes.component.scss']
})
export class EditModesComponent extends UnsubscriptionHandler implements OnInit {
  displayedColumns: Array<string> = ['id', 'name', 'description', 'actions'];
  totalModes: number = 0;
  params: TableParameters = { index: 0, size: 10 }
  filter$ = new Subject<string>();
  dataSource!: MatTableDataSource<Mode>;
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
      this.getModes();
    });

    this.getModes();
  }

  getModes() {
    this.gamesService.getModeList(this.params).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: PagedResponse<Mode>) => {
        this.dataSource = new MatTableDataSource<Mode>(result.results);
        this.totalModes = result.total;
      }
    })
  }

  sortChange(event: Sort) {
    this.params.sortBy = event.active;
    this.params.sortDir = event.direction;
    this.getModes();
  }

  pageChanged(event: PageEvent) {
    this.params.index = event.pageIndex;
    this.params.size = event.pageSize;
    this.getModes();
  }

  searchFilter(event: Event) {
    const el = event.target as HTMLInputElement;
    const value = el.value.trim().toLowerCase();
    if (this.params.search !== value)
      this.filter$.next(value);
  }

  removeMode(mode: Mode) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Mode',
        message: 'Are you sure you want to delete this Mode?'
      }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.gamesService.deleteMode(mode.id).subscribe({
            next: () => {
              this.getModes();
            }
          })
        }
      }
    )
  }

  editMode(mode: Mode) {
    this.dialog.open(EditModesDialogComponent, {
      data: { ...mode }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.gamesService.updateMode(result).subscribe({
          next: () => {
            this.getModes()
          },
          error: (error: Error) => console.log(error)
        })
      }
    })
  }
}
