import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Platform } from 'src/app/models/interfaces/game.interface';

@Component({
  selector: 'app-edit-platforms-dialog',
  templateUrl: './edit-platforms-dialog.component.html',
  styleUrls: ['./edit-platforms-dialog.component.scss']
})
export class EditPlatformsDialogComponent implements OnInit {

  public errorMessages: Array<any> = [];

  editPlatForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditPlatformsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Platform
  ) {

    this.editPlatForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      name: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.editPlatForm.setValue(this.data);
  }

  onSubmit() {
    if (this.editPlatForm.valid) {
      this.dialogRef.close(this.editPlatForm.getRawValue());
    }
  }
}
