import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, Genre, Mode, Platform } from 'src/app/models/interfaces/game.interface';
import { GamesService } from 'src/app/providers/services/games.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  details!: Game;
  id: number;

  constructor(private gameService: GamesService, private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
  }

  getGenres(genres: any) {
    if (Array.isArray(genres)) {
      return genres.map((g: Genre) => g.name).join(', ');
    }
    return null;
  }
  getModes(modes: any) {
    if (Array.isArray(modes)) {
      return modes.map((m: Mode) => m.name).join(', ');
    }
    return null;
  }
  getPlatforms(platforms: any) {
    if (Array.isArray(platforms)) {
      return platforms.map((p: Platform) => p.name).join(', ');
    }
    return null;
  }

  ngOnInit(): void {
    this.getGame(this.id);
  }

  getGame(id: number) {
    this.gameService.getGame(id).subscribe({
      next: (r: Game) => this.details = r
    })
  }
}
