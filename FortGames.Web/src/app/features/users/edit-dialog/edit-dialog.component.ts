import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/interfaces/users.interface';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  editUserForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.editUserForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl({value: null, disabled: true}, [Validators.required]),
      // password: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.editUserForm.setValue(this.data);
  }

  onSubmit() {
    // console.log(this.editUserForm.getRawValue())
    if (this.editUserForm.valid) {
      this.dialogRef.close(this.editUserForm.getRawValue());
    }
  }
}
