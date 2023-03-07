import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userAuthSubscription: Subscription;

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) {}

  ngOnDestroy(): void {
    this.userAuthSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userAuthSubscription = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.saveRecipes();
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout(){
    console.log('logout');
  }
}
