import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Platform } from 'src/app/models/interfaces/game.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { GamesService } from 'src/app/providers/services/games.service';
import { EditPlatformsDialogComponent } from './edit-platforms-dialog/edit-platforms-dialog.component';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { TableParameters } from 'src/app/models/interfaces/table-paramenters.interface';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { PagedResponse } from 'src/app/models/interfaces/paged-response';

@Component({
  selector: 'app-edit-platforms',
  templateUrl: './edit-platforms.component.html',
  styleUrls: ['./edit-platforms.component.scss']
})
export class EditPlatformsComponent extends UnsubscriptionHandler implements OnInit {

  displayedColumns: Array<string> = ['id', 'name', 'actions'];
  dataSource!: MatTableDataSource<Platform>;
  totalPlatforms: number = 0;
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
      distinctUntilChanged(), //capisce il valore del filtro, scatta solo se i valori sono diversi
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.params.search = value;
      this.paginator.firstPage();
      this.getPlatforms();
    });

    this.getPlatforms();
  }

  getPlatforms() {
    this.gamesService.getPlatformList(this.params).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: PagedResponse<Platform>) => {
        this.dataSource = new MatTableDataSource<Platform>(result.results);
        this.totalPlatforms = result.total;
      }
    })
  }

  sortChange(event: Sort) {
    this.params.sortBy = event.active;
    this.params.sortDir = event.direction;
    this.getPlatforms();
  }

  pageChanged(event: PageEvent) {
    this.params.index = event.pageIndex;
    this.params.size = event.pageSize;
    this.getPlatforms();
  }

  searchFilter(event: Event) {
    const el = event.target as HTMLInputElement;
    const value = el.value.trim().toLowerCase();
    if (this.params.search !== value)
      this.filter$.next(value);
  }

  removePlatform(platform: Platform) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Platform',
        message: 'Are you sure you want to delete this Platform?'
      }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.gamesService.deletePlatform(platform.id).subscribe({
            next: () => {
              this.getPlatforms();
            }
          })
        }
      }
    )
  }

  editPlatform(platform: Platform) {
    this.dialog.open(EditPlatformsDialogComponent, {
      data: { ...platform }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.gamesService.updatePlatform(result).subscribe({
          next: () => {
            this.getPlatforms()
          },
          error: (error: Error) => console.log(error)
        })
      }
    })
  }
}
