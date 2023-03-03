import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from "./recipe.model";

export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  recipes: Recipe[] = [
      new Recipe(
        1,
        'A test recipe',
        'This is a simple test',
        'https://cdn.iconscout.com/icon/free/png-512/coffee-1199-1182164.png',
        [
          new Ingredient('Meet', 1),
          new Ingredient('French Fries', 10)
        ]),
      new Recipe(
        2,
        'Another test recipe',
        'This is a simple test',
        'https://cdn.iconscout.com/icon/free/png-512/coffee-1199-1182164.png',
        [
          new Ingredient('Meet', 1),
          new Ingredient('Tomato', 5)
        ])
    ];

  getRecipeList(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe {
    return this.recipes.find(recipe => recipe.id === id);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(recipe: Recipe){
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
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(recipe: Recipe){
    this.recipes.filter((item, index, arr) => {
      if (item.id === recipe.id) {
          arr.splice(index, 1);
          return true;
      }
      return false;
    });

    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipeById(id: number){
    this.recipes.filter((item, index, arr) => {
      if (item.id === id) {
          arr.splice(index, 1);
          return true;
      }
      return false;
    });

    this.recipeChanged.next(this.recipes.slice());
  }
}
