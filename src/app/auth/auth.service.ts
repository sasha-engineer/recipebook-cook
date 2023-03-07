import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user.model';

const SIGN_UP_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBwlW7n51eUs5GOaH7tVYNJx8HUGcDklIQ';
const LOG_IN_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBwlW7n51eUs5GOaH7tVYNJx8HUGcDklIQ';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  userSubject = new BehaviorSubject<User>(null);

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

  logout(){
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
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
          errorMessage = 'This email exists already';
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
  }
}
