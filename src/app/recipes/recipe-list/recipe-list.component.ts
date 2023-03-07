import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeChangedSubsctiption: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnDestroy(): void {
    this.recipeChangedSubsctiption.unsubscribe();
  }

  ngOnInit(): void {
    this.recipeChangedSubsctiption = this.recipeService.recipeChangedSubject
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });

    this.recipes = this.recipeService.getRecipes();
  }
}
