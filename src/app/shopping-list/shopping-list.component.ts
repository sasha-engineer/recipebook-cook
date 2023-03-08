import { ShoppingListService } from './shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSubscription = this.shoppingListService
      .ingredientChanged
      .subscribe(data => this.ingredients = data);
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  onPlusItem(index: number) {
    this.shoppingListService.incrementIngredient(index);
  }

  onMinusItem(index: number) {
    this.shoppingListService.decreaseIngredient(index);
  }
}
