import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Company, Game, Genre, Mode, Platform } from 'src/app/models/interfaces/game.interface';
import { PagedResponse } from 'src/app/models/interfaces/paged-response';
import { TableParameters } from 'src/app/models/interfaces/table-paramenters.interface';
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
    return this.http.get<Game>(`${environment.baseUrlApi}/fortgames/games/${id}`);
  }

  getGamesList(params: TableParameters, filters: Array<any>): Observable<PagedResponse<Game>> {
    let parameters = new HttpParams({
      fromObject: {
        'index': params.index,
        'size': params.size
      }
    });

    if (params.search) {
      parameters = parameters.set('search', params.search);
    }

    if (params.sortDir && params.sortBy) {
      parameters = parameters.set('sortBy', params.sortBy);
      parameters = parameters.set('sortDir', params.sortDir);
    }

    return this.http.post<PagedResponse<Game>>(`${environment.baseUrlApi}/fortgames/games/list`, filters, { params: parameters });
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${environment.baseUrlApi}/fortgames/game`, game);
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(`${environment.baseUrlApi}/fortgames/games`, game);
  }

  deleteGame(id: number): Observable<Game> {
    return this.http.delete<Game>(`${environment.baseUrlApi}/fortgames/game/${id}`);
  }
  //#endregion

  //#region Company
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.baseUrlApi}/fortgames/companies`);
  }

  getCompanyRelatedGames(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.baseUrlApi}/fortgames/companies/${id}`);
  }

  // Aggiunto ora l'addCompany - DA TESTARE
  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${environment.baseUrlApi}/fortgames/companie`, company);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.put<Company>(`${environment.baseUrlApi}/fortgames/companies`, company);
  }

  deleteCompany(id: number): Observable<Company> {
    return this.http.delete<Company>(`${environment.baseUrlApi}/fortgames/company/${id}`);
  }
  //#endregion

  //#region Genre
  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${environment.baseUrlApi}/fortgames/genres`);
  }

  getGenreRelatedGames(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.baseUrlApi}/fortgames/genres/${id}`);
  }

  // Aggiunto ora l'addGenre - DA TESTARE
  addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`${environment.baseUrlApi}/fortgames/genre`, genre);
  }

  updateGenre(genre: Genre): Observable<Genre> {
    return this.http.put<Genre>(`${environment.baseUrlApi}/fortgames/genres`, genre);
  }

  deleteGenre(id: number): Observable<Genre> {
    return this.http.delete<Genre>(`${environment.baseUrlApi}/fortgames/genre/${id}`);
  }
  //#endregion

  //#region Mode
  getModes(): Observable<Mode[]> {
    return this.http.get<Mode[]>(`${environment.baseUrlApi}/fortgames/modes`);
  }

  getModeRelatedGames(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.baseUrlApi}/fortgames/modes/${id}`);
  }

  // Aggiunto ora l'addMode - DA TESTARE
  addMode(mode: Mode): Observable<Mode> {
    return this.http.post<Mode>(`${environment.baseUrlApi}/fortgames/mode`, mode);
  }

  updateMode(mode: Mode): Observable<Mode> {
    return this.http.put<Mode>(`${environment.baseUrlApi}/fortgames/modes`, mode);
  }

  deleteMode(id: number): Observable<Mode> {
    return this.http.delete<Mode>(`${environment.baseUrlApi}/fortgames/mode/${id}`);
  }
  //#endregion

  //#region Platform
  getPlatforms(): Observable<Platform[]> {
    return this.http.get<Platform[]>(`${environment.baseUrlApi}/fortgames/platforms`);
  }

  getPlatformRelatedGames(id: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.baseUrlApi}/fortgames/platforms/${id}`);
  }

  // Aggiunto ora l'addPlatform - DA TESTARE
  addPlatform(platform: Platform): Observable<Platform> {
    return this.http.post<Platform>(`${environment.baseUrlApi}/fortgames/platform`, platform);
  }

  updatePlatform(platform: Platform): Observable<Platform> {
    return this.http.put<Platform>(`${environment.baseUrlApi}/fortgames/platforms`, platform);
  }

  deletePlatform(id: number): Observable<Platform> {
    return this.http.delete<Platform>(`${environment.baseUrlApi}/fortgames/platform/${id}`);
  }
  //#endregion
}
