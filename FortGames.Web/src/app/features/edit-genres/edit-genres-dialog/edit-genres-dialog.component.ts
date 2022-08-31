import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Genre } from 'src/app/models/interfaces/game.interface';

@Component({
  selector: 'app-edit-genres-dialog',
  templateUrl: './edit-genres-dialog.component.html',
  styleUrls: ['./edit-genres-dialog.component.scss']
})
export class EditGenresDialogComponent implements OnInit {

  public errorMessages: Array<any> = [];

  editGenreForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditGenresDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Genre
  ) {

    this.editGenreForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.editGenreForm.setValue(this.data);
  }

  onSubmit() {
    if (this.editGenreForm.valid) {
      this.dialogRef.close(this.editGenreForm.getRawValue());
    }
  }
}
