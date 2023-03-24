import { AuditAction } from './audit-action.model';
import { Ingredient } from "./ingredient.model";

export class IngredientChanged {
  constructor(
    public ingredients: Ingredient[],
    public action: AuditAction) {
  }
}
