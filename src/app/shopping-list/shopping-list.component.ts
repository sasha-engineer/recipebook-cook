import { ShoppingListService } from './shopping-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientSubscription: Subscription;
  private userAuthSubscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSubscription = this.shoppingListService
      .ingredientChanged
      .subscribe(data => this.ingredients = data);

    this.userAuthSubscription =
      this.store
        .select('auth')
        .subscribe(authState => {
          if (!authState.user) {
            this.ingredients = [];
          }
        });
  }

  ngOnDestroy(): void {
    this.ingredientSubscription.unsubscribe();
    this.userAuthSubscription.unsubscribe();
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
