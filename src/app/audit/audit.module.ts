import { AuditComponent } from './audit.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuditRoutingModule } from './audit-routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuditComponent
  ],
  imports: [
    RouterModule,
    AuditRoutingModule,
    SharedModule
  ]
})
export class AuditModule { }
