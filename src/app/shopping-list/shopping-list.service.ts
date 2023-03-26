import { AuditAction } from './../shared/audit-action.model';
import { Subject } from 'rxjs';
import { IngredientChanged } from '../shared/ingredient-changed.model';
import { Ingredient } from "../shared/ingredient.model";
import { Injectable } from '@angular/core';

const defaultIngredients: Ingredient[] = [
  { "amount": 7, "name": "Apple" },
  { "amount": 10, "name": "Orange" }
];

@Injectable()
export class ShoppingListService {
  ingredientChanged = new Subject<IngredientChanged>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = defaultIngredients;
  isDefaultIngredients: boolean = true;

  setIngredients(data: Ingredient[]): void {
    this.isDefaultIngredients = false;
    this.ingredients = data ?? defaultIngredients;
    this.ingredientChanged.next(new IngredientChanged(this.ingredients.slice(), AuditAction.SET_INGREDIENT));
  }

  setDefaultIngredients() {
    this.isDefaultIngredients = true;
    this.ingredients = defaultIngredients;
    this.ingredientChanged.next(new IngredientChanged(this.ingredients.slice(), AuditAction.SET_DEFAULT_INGREDIENT));
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  incrementIngredient(index: number) {
    this.ingredients[index].amount++;
    this.ingredientChanged.next(new IngredientChanged(this.ingredients.slice(), AuditAction.UPDATE_INGREDIENT));
  }

  decreaseIngredient(index: number) {
    if (this.ingredients[index].amount > 0) {
      this.ingredients[index].amount--;
      this.ingredientChanged.next(new IngredientChanged(this.ingredients.slice(), AuditAction.UPDATE_INGREDIENT));
    }
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.unshift(ingredient);
    this.ingredientChanged.next(new IngredientChanged(this.ingredients.slice(), AuditAction.CREATE_INGREDIENT));
  }

  addIngredients(newIngredients: Ingredient[]) {
    this.addIngredientWithoutDuplication(newIngredients);
    this.ingredientChanged.next(new IngredientChanged(this.ingredients.slice(), AuditAction.ADD_INGREDIENTS));
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(new IngredientChanged(this.ingredients.slice(), AuditAction.UPDATE_INGREDIENT));
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(new IngredientChanged(this.ingredients.slice(), AuditAction.DELETE_INGREDIENT));
  }

  private addIngredientWithoutDuplication(data: Ingredient[]) {
    let elementsToAdd: Ingredient[] = [];

    data.forEach((value): void => {
      let isIngredientNew = true;

      for (let i = 0; i < this.ingredients.length - 1; i++) {
        if (this.ingredients[i].name.toUpperCase() === value.name.toUpperCase()) {
          this.ingredients[i].amount = this.ingredients[i].amount + value.amount;

          isIngredientNew = false;
          break;
        }
      }

      if (isIngredientNew) {
        elementsToAdd.push(value);
      }
    });

    if (elementsToAdd.length > 0) {
      this.ingredients.push(...elementsToAdd);
    }
  }
}
