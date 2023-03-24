import { Ingredient } from '../shared/ingredient.model';
import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { ShoppingListService } from './shopping-list.service';

export const SHOPPING_LIST_RESOLVER: ResolveFn<Ingredient[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(ShoppingListService).isDefaultIngredients
      ? inject(DataStorageService).getIngredients()
      : inject(ShoppingListService).getIngredients();
  }
