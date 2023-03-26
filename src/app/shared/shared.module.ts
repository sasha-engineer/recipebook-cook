import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading.spinner.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [LoadingSpinnerComponent, DropdownDirective],
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbModule
  ],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    CommonModule,
    FormsModule,
    BreadcrumbModule
  ]
})
export class SharedModule { }
