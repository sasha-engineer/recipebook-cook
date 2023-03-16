import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take, exhaustMap } from 'rxjs/operators';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class LoggingInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('Outgoing request');
    console.log(request.url);
    console.log(request.headers);

    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }

        const modifiedReq = request
          .clone({ params: new HttpParams().set('auth', user.token) });
        return next.handle(modifiedReq);
      })
    );
  }
}
