import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getApiValidationErrors } from 'src/app/models/utilities';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // private returnUrl: string;
  public errorMessages: Array<any> = [];
  public loading = false;

  registerForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  doRegister() {
    this.authService.register({
      userName: this.registerForm.value.username!,
      firstName: this.registerForm.value.firstname!,
      lastName: this.registerForm.value.lastname!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessages = getApiValidationErrors(error.error);
      }
    })
  }
}

