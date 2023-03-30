import { Guid } from 'guid-typescript';
import { Ingredient } from './../shared/ingredient.model';

export class Step {
  constructor(public step: string) { }
}

export class Recipe {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[],
    public time?: number,
    public servings?: number,
    public shortDescription?: string,
    public uuid?: Guid,
    public refRecipeId?: string,
    public instructions?: Step[]) {
  }
}
