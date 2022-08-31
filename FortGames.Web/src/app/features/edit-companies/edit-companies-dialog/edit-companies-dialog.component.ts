import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from 'src/app/models/interfaces/game.interface';

@Component({
  selector: 'app-edit-companies-dialog',
  templateUrl: './edit-companies-dialog.component.html',
  styleUrls: ['./edit-companies-dialog.component.scss']
})
export class EditCompaniesDialogComponent implements OnInit {

  public errorMessages: Array<any> = [];

  editCompanyForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditCompaniesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company
  ) {

    this.editCompanyForm = new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      website: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.editCompanyForm.setValue(this.data);
  }

  onSubmit() {
    if (this.editCompanyForm.valid) {
      this.dialogRef.close(this.editCompanyForm.getRawValue());
    }
  }
}
