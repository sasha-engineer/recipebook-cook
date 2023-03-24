import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot
} from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

export const RECIPE_RESOLVER: ResolveFn<Recipe[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const data = inject(RecipeService).getRecipes();

    if (data.length === 0) {
      return inject(DataStorageService).getRecipes();
    } else {
      return data;
    }
  }
