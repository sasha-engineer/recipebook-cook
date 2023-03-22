import { Component, Inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { isPlatformBrowser } from '@angular/common';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isBookLoaded: boolean = false;
  userMail: string = '';
  authSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }

    this.authSubscription = this.store.select('auth')
      .subscribe(authState => {
        this.userMail = authState.user
          ? authState.user.email.split('@')[0]
          : '';
      });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
