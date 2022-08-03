import { Component } from '@angular/core';
import { AuthenticationService } from './providers/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Games.Web';
  isAdmin: boolean = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(() => this.isAdmin = this.authService.isAdmin());
  }
}
