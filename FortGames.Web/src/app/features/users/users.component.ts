import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { EditDialogComponent } from 'src/app/features/users/edit-dialog/edit-dialog.component';
import { User } from 'src/app/models/interfaces/users.interface';
import { UsersService } from 'src/app/providers/services/users.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  displayedColumns: Array<string> = ['userName', 'firstName', 'lastName', 'email', 'actions'];
  dataSource!: MatTableDataSource<User>;
  form: FormGroup;
  // user!: User;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _liveAnnouncer: LiveAnnouncer, private userService: UsersService, public dialog: MatDialog) {
    this.form = new FormGroup({
      lCount: new FormControl(1, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (r: User[]) => {
        this.dataSource = new MatTableDataSource<User>(r);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  removeUser(user: User) {
    this.dialog.open(DialogComponent, {
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
              this.getUsers()
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

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
