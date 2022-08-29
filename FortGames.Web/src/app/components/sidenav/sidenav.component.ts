import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/providers/services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(() => this.isAdmin = this.authService.isAdmin());
  }

}
