import { NgModule } from '@angular/core';

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: { breadcrumb: { label: 'Home' } }
  },
  {
    path: 'recipes',
    loadChildren: () => import("./recipes/recipes.module").then(m => m.RecipesModule),
    data: { breadcrumb: { label: 'Recipes' } }
  },
  {
    path: "shopping-list",
    loadChildren: () => import("./shopping-list/shopping-list.module").then(m => m.ShoppingListModule),
    data: { breadcrumb: { label: 'Shopping List' } }
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'audit',
    loadChildren: () => import("./audit/audit.module").then(m => m.AuditModule)
  },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
