import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducer';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('shoppingList', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({
          transform: 'translateX(200px)',
          opacity: 0
        }))
      ])
    ]),
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientSubscription: Subscription;
  private userAuthSubscription: Subscription;
  private isUserAuthenticated: boolean = false;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this
      .initAuthSubscription()
      .initIngredientSubscription();
  }

  private initIngredientSubscription() {
    this.ingredientSubscription =
      this.shoppingListService
        .ingredientChanged
        .subscribe(data => {
          this.ingredients = data.ingredients;

          if (this.isUserAuthenticated) {
            this.dataStorageService.saveIngredients();
            this.dataStorageService.addAudit(data.action);
          }
        });

    return this;
  }

  private initAuthSubscription() {
    this.userAuthSubscription =
      this.store
        .select('auth')
        .subscribe(authState => {
          if (!authState.user) {
            this.shoppingListService.setDefaultIngredients();
          }
          else {
            this.isUserAuthenticated = true;
          }
        });
    return this;
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
