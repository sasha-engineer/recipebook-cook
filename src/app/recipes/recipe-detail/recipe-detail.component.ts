import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Recipe } from './../recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
/*     const id = +this.route.snapshot.params['id'];
    this.recipe = this.recipeService.getRecipe(id); */

    this.route.params
      .subscribe(
        (params: Params) => {
          this.recipe = this.recipeService.getRecipe(+params['id']);
        }
    );
  }

  onAddToShoppingList(){
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
}
