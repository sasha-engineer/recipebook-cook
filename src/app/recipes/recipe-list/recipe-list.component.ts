import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipeChangedSubsctiption: Subscription;
  private userAuthSubscription: Subscription;
  private isUserAuthenticated: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>,) { }

  ngOnDestroy(): void {
    this.recipeChangedSubsctiption.unsubscribe();
    this.userAuthSubscription.unsubscribe();
  }

  ngOnInit(): void {
    // Initial setting
    this.recipes = this.recipeService.getRecipes();

    this.recipeChangedSubsctiption =
      this.recipeService.recipeChangedSubject
        .subscribe((recipes: Recipe[]) => {
          this.recipes = recipes;

          if (this.isUserAuthenticated) {
            this.dataStorageService.saveRecipes();
          }
        });

    this.userAuthSubscription =
      this.store
        .select('auth')
        .subscribe(authState => {
          if (authState.user) {
            this.isUserAuthenticated = true;
          }
        });
  }
}
