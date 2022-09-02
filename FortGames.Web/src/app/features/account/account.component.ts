import { Component, OnInit } from '@angular/core';
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

  userDetails!: User;
  photo = base64Image;
  file!: File;
  base64!: string | undefined;

  // pictureForm = new FormGroup({
  //   profilePicture: new FormControl('')
  // });

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
        this.userDetails = r;
        this.authService.user = r;
      }
    });
  }

  saveChanges() {
    this.userService.editUser(this.userDetails).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        console.log(this.userDetails);
        this.authService.user = this.userDetails;
      },
      error: (err: Error) => console.log(err)
    });
  }


  uploadPhoto($event: any) {
    this.readThis($event.target);
  };

  readThis(inputValue: any) {
    this.file = inputValue.files[0];
    const reader: FileReader = new FileReader();

    this.file ? reader.readAsDataURL(this.file) : null;

    reader.onloadend = () => {
      this.base64 = reader.result?.toString();
      const base64result = this.base64?.substring(this.base64.indexOf(',') + 1, this.base64.length);

      this.userDetails.profilePicture = base64result;
      // this.userDetails.profilePicture = this.pictureForm.value.profilePicture!;

      // this.userService.editUser(this.userDetails).pipe(takeUntil(this.destroy$)).subscribe({
      //   next: () => {
      //     console.log(this.userDetails);
      //     this.authService.user = this.userDetails;
      //   },
      //   error: (err: Error) => console.log(err)
      // });
    }
  };

  removePhoto() {
    if (this.userDetails.profilePicture) {

      this.userDetails.profilePicture = null;
      this.userService.editUser(this.userDetails).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          console.log(this.userDetails);
          this.authService.user = this.userDetails;
        },
        error: (err: Error) => console.log(err)
      });
    }
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
  };
}
