import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { GlobalService } from './global.service';

export interface UserCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  lastLoginErrorMessage: string;

  constructor(private globalService: GlobalService) {
    this.lastLoginErrorMessage = '';
  }

  login(user: UserCredentials): Observable<boolean> {
    if ((user.username === 'a' && user.password === 'a') || (user.username === 'master@lemoncode.net' && user.password === '12345678')) {
      localStorage.setItem('username', user.username);
      localStorage.setItem('token', 'token_simulado');
      return of(true).pipe(delay(2000));

    } else {
      this.lastLoginErrorMessage = 'Wrong credentials';
      return of(false).pipe(delay(2000));

    }
  }

  // logout(): void

  logout(): void {
    console.log('logout');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.globalService.setLogStatus(false);
  }

  // isLogged(): boolean

  isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  // getUsername(): string

  getUsername(): string {
    return localStorage.getItem('username')!;
  }

  getToken(): string {
    return localStorage.getItem('token')!;
  }

  getLastLoginErrorMessage(): string {
    return this.lastLoginErrorMessage;
  }

}
