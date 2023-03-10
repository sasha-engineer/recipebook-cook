import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user.model';
import { UserStorage } from './user-storage.model';

const SIGN_UP_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey;
const LOG_IN_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey;
const LOCAL_STORAGE_USER = 'shoppingUserData';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  signup(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      SIGN_UP_ENDPOINT,
      { email: email, password: password, returnSecureToken: true }
    )
      .pipe(
        map(this.mapError()),
        catchError(this.catchHandleError()),
        tap((resData: AuthResponseData) => this.authHandler(resData))
      );
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      LOG_IN_ENDPOINT,
      { email: email, password: password, returnSecureToken: true }
    )
      .pipe(
        map(this.mapError()),
        catchError(this.catchHandleError()),
        tap((resData: AuthResponseData) => this.authHandler(resData))
      );
  }

  autoLoging() {
    const userData: UserStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.userSubject.next(loadedUser);

      const expirationDate =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogoout(expirationDate)
    }
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem(LOCAL_STORAGE_USER);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogoout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  private catchHandleError() {
    return errorResponse => {
      let errorMessage = 'An unknown error occurred!';
      if (!errorResponse.error || !errorResponse.error.error) {
        console.log(errorResponse);
        throw new Error(errorMessage);
      }

      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists';
      }
      throw new Error(errorMessage);
    };
  }

  private mapError(): (value: any, index: number) => any {
    return (response: any) => {
      if (!response) {
        console.log(response);
        throw new Error('Value expected!');
      }

      console.log(response);
      return response;
    };
  }

  private authHandler(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.localId, data.idToken, expirationDate);

    this.userSubject.next(user);
    this.autoLogoout(+data.expiresIn * 1000);

    localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
  }
}
