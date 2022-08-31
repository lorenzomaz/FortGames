import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Genre } from 'src/app/models/interfaces/game.interface';
import { GamesService } from 'src/app/providers/services/games.service';
import { EditGenresDialogComponent } from './edit-genres-dialog/edit-genres-dialog.component';

@Component({
  selector: 'app-edit-genres',
  templateUrl: './edit-genres.component.html',
  styleUrls: ['./edit-genres.component.scss']
})
export class EditGenresComponent implements OnInit {

  displayedColumns: Array<string> = ['id', 'name', 'description', 'actions'];
  dataSource!: MatTableDataSource<Genre>;
  form: FormGroup;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _liveAnnouncer: LiveAnnouncer, private gamesService: GamesService, public dialog: MatDialog) {
    this.form = new FormGroup({
      lCount: new FormControl(1, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.gamesService.getGenres().subscribe({
      next: (r: Genre[]) => {
        this.dataSource = new MatTableDataSource<Genre>(r);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
