import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

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
  constructor(private httpClient: HttpClient) { }

  signup(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(SIGN_UP_ENDPOINT,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      map(this.mapError()),
      catchError(this.catchHandleError())
    );
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>(
      LOG_IN_ENDPOINT,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
      .pipe(
        map(this.mapError()),
        catchError(this.catchHandleError())
      );
  }

  private catchHandleError() {
    return errorResponse => {
      let errorMessage = 'An unknown error occurred!';
      if (!errorResponse.error || !errorResponse.error.error) {
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
    return (res: any) => {
      if (!res.response) {
        throw new Error('Value expected!');
      }
      return res.response;
    };
  }
}
