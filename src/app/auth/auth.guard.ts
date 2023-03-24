import { map, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

export const AUTH_GUARD: CanActivateFn =
  (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    return inject(Store<fromApp.AppState>)
      .select('auth')
      .pipe(
        take(1),
        map(authState => {
          const isAuth = !!authState.user;

          if (isAuth) {
            true;
          } else {
            return inject(Router).createUrlTree(['/auth']);
          }
        })
      );
  };
