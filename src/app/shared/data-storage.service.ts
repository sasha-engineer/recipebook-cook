import { AuditService } from './../audit/audit.service';
import { AuditAction } from './audit-action.model';
import { environment } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Subscription } from "rxjs";
import { Store } from '@ngrx/store';

import { Ingredient } from './ingredient.model';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

import * as fromApp from '../store/app.reducer';
import { AuditData } from './audit-data.model';

const DATABASE_URL: string = "https://recipe-book-fb4dc-default-rtdb.firebaseio.com/";
const RECIPES_DOCUMENT: string = 'recipes.json';
const INGREDIENTS_DOCUMENT: string = 'ingredients.json';
const AUDIT_DOCUMENT: string = 'audit.json';
const RECIPE_COLLECTION_DOCUMENT: string = 'recipe-collection.json';

const createAuditItem = (action: AuditAction, userId: string) => {
  const createdOn = new Date().toUTCString();
  return new AuditData(
    userId,
    action,
    createdOn
  );
}

@Injectable({ providedIn: 'root' })
export class DataStorageService implements OnDestroy {
  private userId: string = null;
  private userAuthSubscription: Subscription;

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>,
    private auditService: AuditService
  ) {
    this.userAuthSubscription =
      this.store
        .select('auth')
        .pipe(map(authState => authState.user))
        .subscribe(user => this.userId = user ? user.userId : null);
  }

  ngOnDestroy(): void {
    this.userAuthSubscription.unsubscribe();
  }

  createRecipe(data: Recipe) {
    const url = DATABASE_URL + this.userId + '-' + RECIPES_DOCUMENT;
    this.httpClient
      .post<{ name: string }>(
        url,
        data,
        { observe: 'response' }
      )
      .subscribe(response => {
        if (!environment.production) {
          console.log(response);
        }
      });
  }

  saveRecipes() {
    const data = this.recipeService.getRecipes();
    const url = DATABASE_URL + this.userId + '-' + RECIPES_DOCUMENT;

    this.httpClient
      .put(url, data)
      .subscribe(response => {
        if (!environment.production) {
          console.log(response);
        }
      });
  }

  getRecipes() {
    const url = DATABASE_URL + this.userId + '-' + RECIPES_DOCUMENT;

    return this.httpClient
      .get<Recipe[]>(url)
      .pipe(
        map(data => {
          if (data) {
            return data.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : []
              };
            });
          }
        }),
        tap(data => this.recipeService.setRecipes(data))
      );
  }

  saveIngredients() {
    const data = this.shoppingListService.getIngredients();
    const url = DATABASE_URL + this.userId + '-' + INGREDIENTS_DOCUMENT;

    this.httpClient
      .put(url, data)
      .subscribe(response => {
        if (!environment.production) {
          console.log(response);
        }
      });
  }

  getIngredients() {
    if (this.userId) {
      const url = DATABASE_URL + this.userId + '-' + INGREDIENTS_DOCUMENT;

      return this.httpClient
        .get<Ingredient[]>(url)
        .pipe(
          tap(data => this.shoppingListService.setIngredients(data))
        );
    }
    else {
      this.shoppingListService.setDefaultIngredients();
    }
  }

  addAudit(action: AuditAction) {
    const auditItem = createAuditItem(action, this.userId);
    const url = DATABASE_URL + AUDIT_DOCUMENT;

    this.httpClient
      .post(url, auditItem)
      .subscribe(response => {
        if (!environment.production) {
          console.log(response);
        }
      });
  }

  getAudit() {
    const url = DATABASE_URL + AUDIT_DOCUMENT;

    return this.httpClient
      .get<AuditData[]>(url)
      .pipe(
        map(data => {
          if (data) {
            const propertyValues = Object.values(data);

            return propertyValues
              .filter(item => {
                if (this.userId === item.userId) {
                  return new AuditData(
                    item.userId,
                    AuditAction[item.action],
                    item.createdOn);
                }
              });
          }
        }),
        tap(data => this.auditService.setData(data))
      );
  }
}
