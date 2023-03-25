import { RecipeCollectionComponent } from './recipe-collection/recipe-collection.component';
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
    children: [
      {
        path: '', component: RecipeListComponent,
        resolve: [RECIPE_RESOLVER, SHOPPING_LIST_RESOLVER],
        canActivate: [AUTH_GUARD]
      },
      {
        path: 'new', component: RecipeEditComponent,
        resolve: [RECIPE_RESOLVER, SHOPPING_LIST_RESOLVER],
        canActivate: [AUTH_GUARD]
      },
      { path: 'collection/:id', component: RecipeCollectionComponent },
      {
        path: 'my/:id',
        component: RecipeDetailComponent,
        resolve: [RECIPE_RESOLVER, SHOPPING_LIST_RESOLVER],
        canActivate: [AUTH_GUARD]
      },
      {
        path: 'my/:id/edit',
        component: RecipeEditComponent,
        resolve: [RECIPE_RESOLVER, SHOPPING_LIST_RESOLVER],
        canActivate: [AUTH_GUARD]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
