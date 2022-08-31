import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Mode } from 'src/app/models/interfaces/game.interface';
import { GamesService } from 'src/app/providers/services/games.service';
import { EditModesDialogComponent } from './edit-modes-dialog/edit-modes-dialog.component';

@Component({
  selector: 'app-edit-modes',
  templateUrl: './edit-modes.component.html',
  styleUrls: ['./edit-modes.component.scss']
})
export class EditModesComponent implements OnInit {
  displayedColumns: Array<string> = ['id', 'name', 'description', 'actions'];
  dataSource!: MatTableDataSource<Mode>;
  form: FormGroup;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _liveAnnouncer: LiveAnnouncer, private gamesService: GamesService, public dialog: MatDialog) {
    this.form = new FormGroup({
      lCount: new FormControl(1, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getModes();
  }

  getModes() {
    this.gamesService.getModes().subscribe({
      next: (r: Mode[]) => {
        this.dataSource = new MatTableDataSource<Mode>(r);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
