import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';

const defaultRecipes: Recipe[] = [
  new Recipe(
    '1328b4da-daa4-ec23-b68b-6b61b61ff34a',
    'Coffee',
    'Awesome a cup of coffee',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYedm3AvOnORRAo1HMVbJQaSJ_FGtN4Gh0ZQ&usqp=CAU',
    [
      new Ingredient('Milk', 2),
      new Ingredient('Coffee grains', 10)
    ]
  ),
  new Recipe(
    'b78c58ef-c254-b604-876d-97313ed043ca',
    'Pancakes on milk',
    'A recipe for making traditional milk pancakes',
    'https://th.bing.com/th?id=OIP.bb3Q3AMJoAgDMwqOtr6NPwHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    [
      new Ingredient('Milk', 1),
      new Ingredient('Eggs', 4),
      new Ingredient('Flour', 1),
      new Ingredient('Salt', 1),
      new Ingredient('Vegetable oil', 2)
    ]
  )
];

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
