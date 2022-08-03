import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { LogoutComponent } from 'src/app/features/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isAuthenticated = false;
  @Input() drawer!: MatDrawer;

  constructor(private authService: AuthenticationService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(r => this.isAuthenticated = r)
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.closeAll();
    this.dialog.open(LogoutComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
