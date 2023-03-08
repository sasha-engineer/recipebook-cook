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
