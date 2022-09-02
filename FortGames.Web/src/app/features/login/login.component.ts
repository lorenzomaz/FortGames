import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private returnUrl: string;
  public errorMessage = '';
  public loading = false;
  hide = true;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {
    if (!this.authService.isTokenExpired())
      this.router.navigate([this.returnUrl]);
  }

  doLogin() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.loading = true;
      this.authService.login({ email: this.loginForm.value.email!, password: this.loginForm.value.password! }).subscribe({
        next: response => {
          this.authService.handleLogin(response);
          this.router.navigate([this.returnUrl]);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error;
          this.loading = false;
        },
        complete: () => this.loading = false
      });
    }
  }

}
