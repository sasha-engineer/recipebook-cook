import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { SHOPPING_LIST_RESOLVER } from '../shopping-list/shopping-list.resolver';
import { RECIPE_RESOLVER } from "./recipes.resolver";
import { RecipesComponent } from "./recipes.component";
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AUTH_GUARD } from '../auth/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    resolve: [RECIPE_RESOLVER, SHOPPING_LIST_RESOLVER],
    canActivate: [AUTH_GUARD],
    children: [
      { path: '', component: RecipeListComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RECIPE_RESOLVER, SHOPPING_LIST_RESOLVER] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RECIPE_RESOLVER, SHOPPING_LIST_RESOLVER] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
