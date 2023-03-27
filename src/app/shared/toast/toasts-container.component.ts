import { Component, TemplateRef } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from './toast.service';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [
    NgbToastModule,
    NgIf,
    NgTemplateOutlet,
    NgFor
  ],
  templateUrl: './toasts-container.component.html',
  host: { class: 'toast-container position-fixed bottom-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
