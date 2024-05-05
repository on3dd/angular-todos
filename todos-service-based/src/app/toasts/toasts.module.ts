import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsService } from './services/toasts.service';

import { ToastsContainerComponent } from './components/toasts-container/toasts-container.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ToastsContainerComponent],
  imports: [CommonModule, NgbToastModule],
  providers: [ToastsService],
  exports: [ToastsContainerComponent],
})
export class ToastsModule {}
