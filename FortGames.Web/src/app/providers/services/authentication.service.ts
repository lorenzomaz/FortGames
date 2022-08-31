import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from 'src/app/models/interfaces/login.interface';
import { LoginResponse } from 'src/app/models/interfaces/login_response';
import { Register } from 'src/app/models/interfaces/register.interface';
import { User } from 'src/app/models/interfaces/users.interface';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {

  private authSub = new BehaviorSubject<boolean>(false);
  private userSub = new BehaviorSubject<User | null>(null);
  private loggedInUser!: User | null;

  public get user$(): Observable<User | null> {
    return this.userSub.asObservable();
  }

  public set user(v : User | null) {
    this.loggedInUser = v;
    this.userSub.next(v);
  }

  public get isAuthenticated$(): Observable<boolean> {
    return this.authSub.asObservable();
  }

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.authSub.next(!this.tokenService.isTokenExpired()); //in fase iniziale viene passato questo valore

    if (!this.tokenService.isTokenExpired()) {
      this.userSub.next(this.loggedInUser);
    }
  }

  isTokenExpired(): boolean {
    return this.tokenService.isTokenExpired();
  }

  login(body: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.baseUrlApi}/account/login`, body);
  }

  register(body: Register): Observable<any> {
    return this.http.post<any>(`${environment.baseUrlApi}/account/register`, body);
  }

  account(): Observable<any> {
    const token = this.tokenService.getDecodeToken();
    return this.http.get<any>(`${environment.baseUrlApi}/account/${token.email}`);
  }

  isAdmin(): boolean {
    const token = this.tokenService.getDecodeToken();
    if (token) {
      const role: Array<string> | string = token.role;
      return role.includes("Admin");
    }
    return false;
  }

  handleLogin(login: LoginResponse): void {
    this.tokenService.setToken(login.token);
    this.authSub.next(true);
    this.user = login.user;
  }

  logout(): void {
    this.tokenService.removeToken();
    this.authSub.next(false);
    this.user = null;
  }

  ngOnDestroy(): void {
    this.authSub.next(false);
    this.authSub.complete();

    this.userSub.next(null);
    this.userSub.complete();
  }
}
