import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {

  constructor(public dialog: MatDialog, private authService: AuthenticationService, private router: Router) { }
  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
