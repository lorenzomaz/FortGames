import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private tokenHelper: JwtHelperService) { }

  GetToken(): string | undefined {
    return this.tokenHelper.tokenGetter();
  }

  setToken(token: string): void {
    localStorage.setItem(environment.tokenName, token);
  }

  removeToken(): void {
    localStorage.removeItem(environment.tokenName);
  }

  isTokenExpired(): boolean {
    return this.tokenHelper.isTokenExpired();
  }

  getDecodeToken(): any {
    return this.tokenHelper.decodeToken();
  }
}
