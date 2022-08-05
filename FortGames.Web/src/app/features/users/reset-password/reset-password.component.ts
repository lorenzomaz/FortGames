import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validation } from 'src/app/models/classes/validation.class';
import { ResetPassword } from 'src/app/models/interfaces/reset-password.interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ResetPasswordComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: User,
    @Inject(MAT_DIALOG_DATA) public pass: ResetPassword
  ) {
    this.resetPasswordForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      userName: new FormControl({ value: null, disabled: true }, [Validators.required]),
      email: new FormControl({ value: null, disabled: true }, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required])
    }, Validation.mustMatch('password', 'confirmPassword'));
  }

  ngOnInit(): void {
    // console.log(this.pass);
    this.resetPasswordForm.setValue(this.pass);
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.dialogRef.close(this.resetPasswordForm.getRawValue());
    }
  }
}
