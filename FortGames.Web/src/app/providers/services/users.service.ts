import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/interfaces/users.interface';
import { ResetPassword } from 'src/app/models/interfaces/reset-password.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrlApi}/account/users`);
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
