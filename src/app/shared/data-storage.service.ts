import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  createRecipe(data: Recipe) {
    this.httpClient
      .post<{ name: string }>(
        'https://complete-guide-4d2b9-default-rtdb.firebaseio.com/recipes.json',
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
        'https://complete-guide-4d2b9-default-rtdb.firebaseio.com/recipes.json',
        data
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  getRecipes() {
    return this.authService.userSubject
      .pipe(
        take(1),
        exhaustMap(user => {
          return this.httpClient
            .get<Recipe[]>(
              'https://complete-guide-4d2b9-default-rtdb.firebaseio.com/recipes.json',
              {
                params: new HttpParams().set('auth', user.token)
              }
            );
        }),
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
}
