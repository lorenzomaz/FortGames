import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mode } from 'src/app/models/interfaces/game.interface';

@Component({
  selector: 'app-edit-modes-dialog',
  templateUrl: './edit-modes-dialog.component.html',
  styleUrls: ['./edit-modes-dialog.component.scss']
})
export class EditModesDialogComponent implements OnInit {

  public errorMessages: Array<any> = [];

  editModeForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditModesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mode
  ) {

    this.editModeForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.editModeForm.setValue(this.data);
  }

  onSubmit() {
    if (this.editModeForm.valid) {
      this.dialogRef.close(this.editModeForm.getRawValue());
    }
  }

}
