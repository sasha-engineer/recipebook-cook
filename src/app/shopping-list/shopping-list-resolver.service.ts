import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class ShoppingListResolverService implements Resolve<Ingredient[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private shoppingListService: ShoppingListService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Ingredient[] |
    Observable<Ingredient[]> |
    Promise<Ingredient[]> {
    const data = this.shoppingListService.getIngredients();

    if (data.length === 0) {
      return this.dataStorageService.getIngredients();
    } else {
      return data;
    }
  }
}
