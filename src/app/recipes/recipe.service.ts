import { Ingredient } from './../shared/ingredient.model';
import { Recipe } from "./recipe.model";

export class RecipeService {

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
}
