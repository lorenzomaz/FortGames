// import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/interfaces/game.interface';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  games: Array<Game> = new Array<Game>();

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.gamesService.getGames().subscribe({
      next: (r: Game[]) => {
        this.games = r;
      }
    })
  }

  // getGame(game: Game) {
  //   this.gamesService.getGame(game.id).subscribe({
  //     next: () => {
  //       this.getGames();
  //     }
  //   })
  // }

}
