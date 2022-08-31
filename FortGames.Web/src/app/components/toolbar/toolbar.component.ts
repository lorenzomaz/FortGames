import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';
import { MatDrawer } from '@angular/material/sidenav';
import { LogoutComponent } from 'src/app/features/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { Register } from 'src/app/models/interfaces/register.interface';
import { AccountComponent } from 'src/app/features/account/account.component';
import { User } from 'src/app/models/interfaces/users.interface';
import { base64Image } from 'src/app/models/utilities';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() drawer!: MatDrawer;

  photo = base64Image;
  isAuthenticated = false;
  user!: User | null;

  constructor(
    private authService: AuthenticationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(r => this.isAuthenticated = r);
    this.authService.user$.subscribe(r => this.user = r);
    this.getAccount();
  }

  getAccount() {
    if (this.isAuthenticated) {
      this.authService.account().subscribe({
        next: (r: User) => {
          this.authService.user = r;
        }
      });
    }
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
