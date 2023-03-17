import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingListResolverService } from './../shopping-list/shopping-list-resolver.service';
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    resolve: [RecipesResolverService, ShoppingListResolverService],
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeListComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService, ShoppingListResolverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService, ShoppingListResolverService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
