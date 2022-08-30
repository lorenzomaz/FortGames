import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Register } from 'src/app/models/interfaces/register.interface';
import { User } from 'src/app/models/interfaces/users.interface';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';
import { UsersService } from 'src/app/providers/services/users.service';
import { EditDialogComponent } from '../users/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  details!: Register;

  constructor(
    private authService: AuthenticationService,
    private userService: UsersService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.authService.account().subscribe({
      next: (r: Register) => this.details = r
    });
  }

  name() {
    this.authService.userName = 'ciccio';
  }

  editName(user: Register) {
    this.dialog.open(EditDialogComponent, {
      data: { ...user}
    }).afterClosed().subscribe(
      result => {
        if (result) {
          this.userService.editUser(result).subscribe({
            next: () => {
              this.getInfo();
            },
            error: (error: Error) => console.log(error)
          })
          this.authService.userName = result.userName;
        }
      }
    )
  }

}
