import { AfterViewChecked, Component, DoCheck, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { LogoutComponent } from 'src/app/features/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/providers/services/users.service';
import { User } from 'src/app/models/interfaces/users.interface';
import { Register } from 'src/app/models/interfaces/register.interface';
import { AccountComponent } from 'src/app/features/account/account.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @ViewChild(AccountComponent) AccountComponent!: AccountComponent;
  @Input() drawer!: MatDrawer;

  isAuthenticated = false;
  userName!: string | null;
  currentUser!: Register;

  constructor(
    private authService: AuthenticationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(r => this.isAuthenticated = r);
    this.authService.userName$.subscribe(r => this.userName = r);
    this.getAccount();
  }

  getAccount() {
    this.authService.account().subscribe({
      next: (r: Register) => {
        this.currentUser = r;
        console.log("username: " + this.currentUser.userName);
        this.authService.userName = r.userName;
      }
    });
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
