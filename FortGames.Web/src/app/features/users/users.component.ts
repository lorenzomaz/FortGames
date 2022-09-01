import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditDialogComponent } from 'src/app/features/users/edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/models/interfaces/users.interface';
import { UsersService } from 'src/app/providers/services/users.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, UnsubscriptionError } from 'rxjs';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { TableParameters } from 'src/app/models/interfaces/table-paramenters.interface';
import { PagedResponse } from 'src/app/models/interfaces/paged-response';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent extends UnsubscriptionHandler implements OnInit {
  displayedColumns: Array<string> = ['userName', 'firstName', 'lastName', 'email', 'actions'];
  dataSource!: MatTableDataSource<User>;
  totalUsers: number = 0;
  params: TableParameters = { index: 0, size: 10 };
  filter$ = new Subject<string>();
  form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UsersService, public dialog: MatDialog, private authService: AuthenticationService) {
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
      this.getUsers();
    });

    this.getUsers();
  }

  getUsers() {
    this.userService.getUserList(this.params).pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: PagedResponse<User>) => {
        this.dataSource = new MatTableDataSource<User>(result.results);
        this.totalUsers = result.total;
      }
    })
  }

  sortChange(event: Sort) {
    this.params.sortBy = event.active;
    this.params.sortDir = event.direction;
    this.getUsers();
  }

  pageChanged(event: PageEvent) {
    this.params.index = event.pageIndex;
    this.params.size = event.pageSize;
    this.getUsers();
  }

  searchFilter(event: Event) {
    const el = event.target as HTMLInputElement;
    const value = el.value.trim().toLowerCase();
    if (this.params.search !== value)
      this.filter$.next(value);
  }

  removeUser(user: User) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete User',
        message: 'Would you like to delete this user account?'
      }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.userService.removeUser(user.email).subscribe({
            next: () => {
              this.getUsers();
            },
            error: (error: Error) => console.log(error)
          })
        }
      })
  }

  editUser(user: User) {
    this.dialog.open(EditDialogComponent, {
      data: { ...user }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.userService.editUser(result).subscribe({
            next: () => {
              this.getUsers();
            },
            error: (error: Error) => console.log(error)
          })
        }
      }
    )
  }

  resetPassword(user: User) {
    this.dialog.open(ResetPasswordComponent, {
      data: { id: user.id, userName: user.userName, email: user.email, password: null, confirmPassword: null }
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.userService.resetPassword(result).subscribe({
            next: () => {
              this.getUsers()
            },
            error: (error: Error) => console.log(error)
          })
        }
      }
    )
  }
}
