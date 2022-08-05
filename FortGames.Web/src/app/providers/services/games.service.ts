import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, Game, Genre, Mode, Platform } from 'src/app/models/interfaces/game.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  //#region Game
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.baseUrlApi}/fortgames/games`);
  }
  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${environment.baseUrlApi}/fortgames/games/` + { id });
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${environment.baseUrlApi}/fortgames/game`, game);
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${environment.baseUrlApi}/fortgames/games`, game);
  }

  deleteGame(id: number): Observable<Game> {
    return this.http.delete<Game>(`${environment.baseUrlApi}/fortgames/game/` + { id });
  }
  //#endregion

  //#region Company
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.baseUrlApi}/fortgames/companies`);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${environment.baseUrlApi}/fortgames/companies`, company);
  }

  deleteCompany(id: number): Observable<Company> {
    return this.http.delete<Company>(`${environment.baseUrlApi}/fortgames/company` + { id });
  }
  //#endregion

  //#region Genre
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.baseUrlApi}/fortgames/genres`);
  }

  updateGenre(genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${environment.baseUrlApi}/fortgames/genres`, genre);
  }

  deleteGenre(id: number): Observable<Genre> {
    return this.http.delete<Genre>(`${environment.baseUrlApi}/fortgames/genre` + { id });
  }
  //#endregion

  //#region Mode
  getModes(): Observable<Mode[]> {
    return this.http.get<Mode[]>(`${environment.baseUrlApi}/fortgames/modes`);
  }

  updateMode(mode: Mode): Observable<Mode> {
    return this.http.put<Mode>(`${environment.baseUrlApi}/fortgames/modes`, mode);
  }

  deleteMode(id: number): Observable<Mode> {
    return this.http.delete<Mode>(`${environment.baseUrlApi}/fortgames/mode` + { id });
  }
  //#endregion

  //#region Platform
  getPlatforms(): Observable<Platform[]> {
    return this.http.get<Platform[]>(`${environment.baseUrlApi}/fortgames/platforms`);
  }

  updatePlatform(platform: Platform): Observable<Platform> {
    return this.http.put<Platform>(`${environment.baseUrlApi}/fortgames/platforms`, platform);
  }

  deletePlatform(id: number): Observable<Platform> {
    return this.http.delete<Platform>(`${environment.baseUrlApi}/fortgames/platform` + { id });
  }
  //#endregion
}
