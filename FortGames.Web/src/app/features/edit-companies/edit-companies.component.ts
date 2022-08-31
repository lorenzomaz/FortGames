import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Company } from 'src/app/models/interfaces/game.interface';
import { GamesService } from 'src/app/providers/services/games.service';
import { EditCompaniesDialogComponent } from './edit-companies-dialog/edit-companies-dialog.component';

@Component({
  selector: 'app-edit-companies',
  templateUrl: './edit-companies.component.html',
  styleUrls: ['./edit-companies.component.scss']
})
export class EditCompaniesComponent implements OnInit {

  displayedColumns: Array<string> = ['id', 'name', 'description', 'website', 'actions'];
  dataSource!: MatTableDataSource<Company>;
  form: FormGroup;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _liveAnnouncer: LiveAnnouncer, private gamesService: GamesService, public dialog: MatDialog) {
    this.form = new FormGroup({
      lCount: new FormControl(1, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.gamesService.getCompanies().subscribe({
      next: (r: Company[]) => {
        this.dataSource = new MatTableDataSource<Company>(r);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  removeCompany(company: Company) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Company',
        message: 'Are you sure you want to delete this Company?'
      }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.gamesService.deleteCompany(company.id).subscribe({
            next: () => {
              this.getCompanies();
            }
          })
        }
      }
    )
  }

  editCompany(company: Company) {
    this.dialog.open(EditCompaniesDialogComponent, {
      data: { ...company }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.gamesService.updateCompany(result).subscribe({
          next: () => {
            this.getCompanies()
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
