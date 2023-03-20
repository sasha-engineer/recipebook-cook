import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import { AuthUser } from '../auth-user.model';
import { UserStorage } from '../user-storage.model';

const SIGN_UP_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
const LOG_IN_ENDPOINT = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;
const LOCAL_STORAGE_USER = 'shoppingUserData';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const mapAuthResponse = (data: AuthResponseData) => {
  const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
  return new UserStorage(
    data.email,
    data.localId,
    data.idToken,
    expirationDate
  );
}

const mapToAuthUser = (data: UserStorage, redirect: boolean = false) => {
  return new AuthUser(
    data.email,
    data.userId,
    data.token,
    data.expirationDate,
    redirect
  );
}

const handleAuthentication = (user: UserStorage) => {
  localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess(mapToAuthUser(user, true));
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }

  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  authSignup = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
          return this.http
            .post<AuthResponseData>(
              SIGN_UP_ENDPOINT,
              {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
              }
            )
            .pipe(
              tap(resData => {
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              }),
              map(resData => {
                const userStorage = mapAuthResponse(resData);
                return handleAuthentication(userStorage);
              }),
              catchError(errorRes => handleError(errorRes))
            );
        })
      ));

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            LOG_IN_ENDPOINT,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true
            }
          )
          .pipe(
            tap(resData => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map(resData => {
              const userStorage = mapAuthResponse(resData);
              return handleAuthentication(userStorage);
            }),
            catchError(errorRes => handleError(errorRes))
          );
      })
    ));

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
          if (authSuccessAction.payload.redirect) {
            this.router.navigate(['/recipes']);
          }
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
          const userData: UserStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER));

          if (!userData) {
            return { type: 'DUMMY' };
          }

          if (userData.token) {
            const expirationDuration =
            new Date(userData.expirationDate).getTime() -
              new Date().getTime();

            this.authService.setLogoutTimer(expirationDuration);

            return new AuthActions.AuthenticateSuccess(mapToAuthUser(userData));
          }
          return { type: 'DUMMY' };
        })
      )
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem(LOCAL_STORAGE_USER);
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );
}
