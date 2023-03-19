import { Component, Inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isBookLoaded: boolean = false;
  private bookExpirationTimer: any;

  constructor(
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) { }

  ngOnDestroy(): void {
    this.clearBookLoaderTimer();
  }

  ngOnInit() {
    //this.setBookLoaderTimer();

    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }
  }

  setBookLoaderTimer(expirationDuration: number = 3100) {
    this.bookExpirationTimer = setTimeout(() => {
      this.isBookLoaded = true;
    }, expirationDuration);
  }

  clearBookLoaderTimer() {
    if (this.bookExpirationTimer) {
      clearTimeout(this.bookExpirationTimer);
      this.bookExpirationTimer = null;
    }
  }
}
