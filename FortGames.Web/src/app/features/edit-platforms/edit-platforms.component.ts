import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Platform } from 'src/app/models/interfaces/game.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { GamesService } from 'src/app/providers/services/games.service';
import { EditPlatformsDialogComponent } from './edit-platforms-dialog/edit-platforms-dialog.component';

@Component({
  selector: 'app-edit-platforms',
  templateUrl: './edit-platforms.component.html',
  styleUrls: ['./edit-platforms.component.scss']
})
export class EditPlatformsComponent implements OnInit {

  displayedColumns: Array<string> = ['id', 'name', 'actions'];
  dataSource!: MatTableDataSource<Platform>;
  form: FormGroup;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _liveAnnouncer: LiveAnnouncer, private gamesService: GamesService, public dialog: MatDialog) {
    this.form = new FormGroup({
      lCount: new FormControl(1, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getPlatforms();
  }

  getPlatforms() {
    this.gamesService.getPlatforms().subscribe({
      next: (r: Platform[]) => {
        this.dataSource = new MatTableDataSource<Platform>(r);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
