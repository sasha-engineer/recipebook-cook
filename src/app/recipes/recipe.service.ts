import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipeChangedSubject = new Subject<Recipe[]>();
  isLoadingData = false;
  private recipes: Recipe[] = [];

  setRecipes(data: Recipe[]): void {
    this.recipes = data;
    this.recipeChangedSubject.next(this.recipes.slice());
  }

  /* recipes: Recipe[] = [
      new Recipe(
        Guid.parse('706fcfcb-8692-4475-8fe1-21c7cd887be2'),
        'A test recipe',
        'This is a simple test',
        'https://cdn.iconscout.com/icon/free/png-512/coffee-1199-1182164.png',
        [
          new Ingredient('Meet', 1),
          new Ingredient('French Fries', 10)
        ]),
      new Recipe(
        Guid.parse('bb39c315-7589-4f28-b420-5e9e4e044248'),
        'Another test recipe',
        'This is a simple test',
        'https://cdn.iconscout.com/icon/free/png-512/coffee-1199-1182164.png',
        [
          new Ingredient('Meet', 1),
          new Ingredient('Tomato', 5)
        ])
    ]; */

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: string): Recipe {
    return this.recipes.find(r => r.id === id);
  }

  addRecipe(recipe: Recipe) {
    recipe.id = Guid.create().toString();
    this.recipes.push(recipe);
    this.recipeChangedSubject.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe) {
    console.log(recipe.name);

    this.recipes.filter((item, index, arr) => {
      if (item.id === recipe.id) {
        console.log(index + ' - ' + recipe);
        arr[index] = recipe;
        return true;
      }
      return false;
    });

    console.log(this.recipes.slice());
    this.recipeChangedSubject.next(this.recipes.slice());
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.filter((item, index, arr) => {
      if (item.id === recipe.id) {
        arr.splice(index, 1);
        return true;
      }
      return false;
    });

    this.recipeChangedSubject.next(this.recipes.slice());
  }

  deleteRecipeById(id: string) {
    this.recipes.filter((item, index, arr) => {
      if (item.id === id) {
        arr.splice(index, 1);
        return true;
      }
      return false;
    });

    this.recipeChangedSubject.next(this.recipes.slice());
  }
}
