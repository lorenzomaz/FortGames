import { Component, OnInit } from '@angular/core';
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
export class HomeComponent extends UnsubscriptionHandler implements OnInit {

  games: Array<Game> = new Array<Game>();
  // game: Game[] = [];
  // id?: number;

  constructor(private gamesService: GamesService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    // this.getGames();
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

  // getGames() {
  //   this.gamesService.getGames().subscribe({
  //     next: (r: Game[]) => {
  //       this.games = r;
  //     }
  //   })
  // }

  // getGame(game: Game) {
  //   this.gamesService.getGame(this.game.id).subscribe({
  //     next: () => {
  //       this.getGames();
  //     }
  //   })
  // }

}
