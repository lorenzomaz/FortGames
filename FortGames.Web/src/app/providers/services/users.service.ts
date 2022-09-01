import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/interfaces/users.interface';
import { Company } from 'src/app/models/interfaces/game.interface';
import { PagedResponse } from 'src/app/models/interfaces/paged-response';
import { TableParameters } from 'src/app/models/interfaces/table-paramenters.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrlApi}/account/users`);
  }

  getUserList(params: TableParameters): Observable<PagedResponse<User>> {
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

    return this.http.get<PagedResponse<User>>(`${environment.baseUrlApi}/account/users/list`, { params: parameters });
  }

  removeUser(email: string): Observable<string> {
    return this.http.delete<string>(`${environment.baseUrlApi}/account/users/${email}`);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${environment.baseUrlApi}/account/users`, user);
  }
  resetPassword(user: User): Observable<User> {
    return this.http.post<User>(`${environment.baseUrlApi}/account/users/reset`, user);
  }
}
