import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastsContainerComponent } from './components/toasts-container/toasts-container.component';
import { ToastsService } from './services/toasts.service';

@NgModule({
  declarations: [ToastsContainerComponent],
  imports: [CommonModule, NgbToastModule],
  providers: [ToastsService],
  exports: [ToastsContainerComponent],
})
export class ToastsModule {}
