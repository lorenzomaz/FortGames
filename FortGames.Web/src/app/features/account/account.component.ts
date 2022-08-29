import { Component, OnInit, Output } from '@angular/core';
import { Register } from 'src/app/models/interfaces/register.interface';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  details!: Register;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getInfo();

  }

  getInfo() {
    this.authService.account().subscribe({
      next: (r: Register) => this.details = r
    });
  }

  name() {
    this.authService.userName = 'ciccio';
  }

}
