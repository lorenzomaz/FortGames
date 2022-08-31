import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { User } from 'src/app/models/interfaces/users.interface';
import { base64Image } from 'src/app/models/utilities';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';
import { UsersService } from 'src/app/providers/services/users.service';
import { EditDialogComponent } from '../users/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends UnsubscriptionHandler implements OnInit {

  details!: User;
  photo = base64Image;
  pictureForm = new FormGroup({
    profilePicture: new FormControl('')
  })

  constructor(
    private authService: AuthenticationService,
    private userService: UsersService,
    private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.authService.account().pipe(takeUntil(this.destroy$)).subscribe({
      next: (r: User) => {
        this.details = r;
        this.authService.user = r;
      }
    });
  }


  editPhoto() {
    this.details.profilePicture = this.pictureForm.value.profilePicture!;

    this.userService.editUser(this.details).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        console.log(this.details);
        this.authService.user = this.details;
      },
      error: (err: Error) => console.log(err)

    })
  }

  editName(user: User) {
    this.dialog.open(EditDialogComponent, {
      data: { ...user }
    }).afterClosed().subscribe(
      result => {
        console.log(result);

        if (result) {
          this.userService.editUser(result).pipe(takeUntil(this.destroy$)).subscribe({
            next: () => {
              this.getInfo();
            },
            error: (error: Error) => console.log(error)
          })
        }
      }
    )
  }
}
