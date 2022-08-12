import { Component, HostListener } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { AuthenticationService } from './providers/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Games.Web';
  isAdmin: boolean = false;
  windowWidth!: number;
  navMode: MatDrawerMode = 'side';
  backdrop: boolean = false;

  @HostListener('window:resize')
  onResize() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth < 992) {
      this.navMode = 'over';
      this.backdrop = true;
    } else {
      this.navMode = 'side';
      this.backdrop = false;
    }
  }

  menu = [
    { name: 'Home', link: '/', icon: 'home' },
    { name: 'Advanced Search', link: 'advanced_search', icon: 'search' }
  ]

  loggedMenu = [
    { name: 'Users', link: 'users', icon: 'group' },
    { name: 'Add Game', link: 'add-game', icon: 'add' },
  ]

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(() => this.isAdmin = this.authService.isAdmin());
  }
}
