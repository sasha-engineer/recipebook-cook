import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading.spinner.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingSpinnerComponent, DropdownDirective],
  imports: [CommonModule, FormsModule],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirective,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
