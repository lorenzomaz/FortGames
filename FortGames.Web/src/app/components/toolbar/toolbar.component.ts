import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';
import { MatDrawer } from '@angular/material/sidenav';
import { LogoutComponent } from 'src/app/features/logout/logout.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/interfaces/users.interface';
import { base64Image } from 'src/app/models/utilities';
import { takeUntil } from 'rxjs';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent extends UnsubscriptionHandler implements OnInit {

  @Input() drawer!: MatDrawer;

  photo = base64Image;
  pageLoaded = true;
  toggleAnim = false;
  isAuthenticated = false;
  user!: User | null;

  constructor(
    private authService: AuthenticationService,
    public dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.pipe(takeUntil(this.destroy$)).subscribe(r => this.isAuthenticated = r);
    this.authService.user$.pipe(takeUntil(this.destroy$)).subscribe(r => this.user = r);
    this.getAccount();

    console.log(this.pageLoaded, this.toggleAnim)
  }

  getAccount() {
    if (this.isAuthenticated) {
      this.authService.account().pipe(takeUntil(this.destroy$)).subscribe({
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

  castleAnim() {
    this.pageLoaded = false;
    this.toggleAnim = !this.toggleAnim;
  }

  pageLoading(){
    this.pageLoaded = true;
  }
}
