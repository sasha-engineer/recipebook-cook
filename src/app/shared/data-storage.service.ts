import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { pipe, Subscription } from "rxjs";
import { Store } from '@ngrx/store';

import { Ingredient } from './ingredient.model';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class DataStorageService implements OnDestroy {
  private userId: string = null;
  private userAuthSubscription: Subscription;

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {
    this.userAuthSubscription =
      this.store
        .select('auth')
        .pipe(map(authState => authState.user))
        .subscribe(user => {
          if (user) {
            this.userId = user.id;
          }
        });
  }

  ngOnDestroy(): void {
    this.userAuthSubscription.unsubscribe();
  }

  createRecipe(data: Recipe) {
    this.httpClient
      .post<{ name: string }>(
        'https://complete-guide-4d2b9-default-rtdb.firebaseio.com/' + this.userId + '-recipes.json',
        data,
        { observe: 'response' }
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        }
      );
  }

  saveRecipes() {
    const data = this.recipeService.getRecipes();
    this.httpClient
      .put(
        'https://complete-guide-4d2b9-default-rtdb.firebaseio.com/' + this.userId + '-recipes.json',
        data
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  getRecipes() {
    return this.httpClient
      .get<Recipe[]>(
        'https://complete-guide-4d2b9-default-rtdb.firebaseio.com/' + this.userId + '-recipes.json'
      )
      .pipe(
        map(data => {
          return data.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(data => this.recipeService.setRecipes(data))
      );
  }

  saveIngredients() {
    const data = this.shoppingListService.getIngredients();

    this.httpClient
      .put(
        'https://complete-guide-4d2b9-default-rtdb.firebaseio.com/' + this.userId + '-ingredients.json',
        data
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  getIngredients() {
    return this.httpClient
      .get<Ingredient[]>(
        'https://complete-guide-4d2b9-default-rtdb.firebaseio.com/' + this.userId + '-ingredients.json'
      )
      .pipe(
        tap(data => this.shoppingListService.setIngredients(data))
      );
  }
}
