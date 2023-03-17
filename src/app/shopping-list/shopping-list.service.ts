import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";

const defaultIngredients: Ingredient[] = [
  { "amount": 7, "name": "Apple" },
  { "amount": 10, "name": "Orange" }
];

export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = defaultIngredients.slice();
  isDefaultIngredients: boolean = true;

  setIngredients(data: Ingredient[]): void {
    this.isDefaultIngredients = false;
    this.ingredients = data ?? defaultIngredients.slice();
    this.ingredientChanged.next(this.ingredients.slice());
  }

  setDefaultIngredients() {
    this.isDefaultIngredients = true;
    this.ingredients = defaultIngredients.slice();
    this.ingredientChanged.next(this.ingredients.slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  incrementIngredient(index: number) {
    this.ingredients[index].amount++;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  decreaseIngredient(index: number) {
    if (this.ingredients[index].amount > 0) {
      this.ingredients[index].amount--;
      this.ingredientChanged.next(this.ingredients.slice());
    }
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.unshift(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(newIngredients: Ingredient[]) {
    // TODO: add validation of existing items in the list
    this.ingredients.push(...newIngredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
