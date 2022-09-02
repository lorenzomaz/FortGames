import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { Company } from 'src/app/models/interfaces/game.interface';
import { PagedResponse } from 'src/app/models/interfaces/paged-response';
import { TableParameters } from 'src/app/models/interfaces/table-paramenters.interface';
import { GamesService } from 'src/app/providers/services/games.service';
import { EditCompaniesDialogComponent } from './edit-companies-dialog/edit-companies-dialog.component';

@Component({
  selector: 'app-edit-companies',
  templateUrl: './edit-companies.component.html',
  styleUrls: ['./edit-companies.component.scss']
})
export class EditCompaniesComponent extends UnsubscriptionHandler implements OnInit {

  displayedColumns: Array<string> = ['id', 'name', 'description', 'website', 'actions'];
  dataSource!: MatTableDataSource<Company>;
  totalCompanies: number = 0;
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
      this.getCompanies();
    });

    this.getCompanies();
  }

  getCompanies() {
    this.gamesService.getCompanyList(this.params).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: PagedResponse<Company>) => {
        this.dataSource = new MatTableDataSource<Company>(result.results);
        this.totalCompanies = result.total;
      }
    })
  }

  sortChange(event: Sort) {
    this.params.sortBy = event.active;
    this.params.sortDir = event.direction;
    this.getCompanies();
  }

  pageChanged(event: PageEvent) {
    this.params.index = event.pageIndex;
    this.params.size = event.pageSize;
    this.getCompanies();
  }

  searchFilter(event: Event) {
    const el = event.target as HTMLInputElement;
    const value = el.value.trim().toLowerCase();
    if (this.params.search !== value)
      this.filter$.next(value);
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
}
