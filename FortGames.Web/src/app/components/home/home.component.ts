import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, takeUntil } from 'rxjs';
import { UnsubscriptionHandler } from 'src/app/models/classes/unsubscription-handler';
import { Game } from 'src/app/models/interfaces/game.interface';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends UnsubscriptionHandler implements OnInit, AfterViewInit {

  loading: boolean = true;

  games: Array<Game> = new Array<Game>();

  constructor(private gamesService: GamesService, private router: Router) {
    super();
  }

  ngOnInit(): void {

    const games = this.gamesService.getGames();
    const genres = this.gamesService.getGenres();
    const companies = this.gamesService.getCompanies();
    const platforms = this.gamesService.getPlatforms();

    forkJoin([games, genres, companies, platforms]).pipe(takeUntil(this.destroy$)).subscribe({
      next: results => {
        this.games = results[0];
      }
    });
  }

  ngAfterViewInit() {
      this.loading = false;
  }

}
