import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

const MIN_WIDTH: number = 992;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authSubscription: Subscription;
  @ViewChild('navbarToggler', { read: ElementRef, static: false }) navbarToggler: ElementRef;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) { }

  public getScreenWidth: any;
  public getScreenHeight: any;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;

    this.authSubscription =
      this.store
        .select('auth')
        .subscribe(authState => this.isAuthenticated = !!authState.user);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.saveRecipes();
    this.dataStorageService.saveIngredients();
    this.onRouterLink();
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
    this.onRouterLink();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    this.onRouterLink();
  }

  onLogin() {
    this.onRouterLink();
  }

  onRouterLink() {
    if (this.getScreenWidth < MIN_WIDTH) {
      this.navbarToggler.nativeElement.click();
    }
  }
}
