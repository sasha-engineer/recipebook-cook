import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { exhaustMap, map, take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth')
      .pipe(
        take(1),
        map(authState => authState.user),
        exhaustMap(user => {
          if (!user) {
            return next.handle(req);
          }

          const authReq = req.clone({ params: new HttpParams().set('auth', user.token) });
          return next.handle(authReq);
        })
      );
  }
}
