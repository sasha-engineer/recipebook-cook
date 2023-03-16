import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from "./recipe.model";

const defaultRecipes: Recipe[] = [{
  "description": "Awesome a cup of coffee",
  "id": "1328b4da-daa4-ec23-b68b-6b61b61ff34a",
  "imagePath": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYedm3AvOnORRAo1HMVbJQaSJ_FGtN4Gh0ZQ&usqp=CAU",
  "ingredients": [
    {
      "amount": 2,
      "name": "Milk"
    },
    {
      "amount": 20,
      "name": "Coffee grains"
    }
  ],
  "name": "Coffee"
}];

@Injectable()
export class RecipeService {
  recipeChangedSubject = new Subject<Recipe[]>();
  isLoadingData = false;
  private recipes: Recipe[] = [];

  setRecipes(data: Recipe[]): void {
    this.recipes = data ?? defaultRecipes;
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
