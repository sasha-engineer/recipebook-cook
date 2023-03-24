import { AuditComponent } from './audit.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AUDIT_RESOLVER } from './audit.resolver';
import { AUTH_GUARD } from '../auth/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: AuditComponent,
    resolve: [AUDIT_RESOLVER],
    canActivate: [AUTH_GUARD]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class AuditRoutingModule {

}
