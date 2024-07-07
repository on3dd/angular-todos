import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Toast, ToastsService } from '../../services/toasts.service';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastsContainerComponent {
  private readonly toastsService = inject(ToastsService);

  toasts = this.toastsService.toasts;

  removeToast(toast: Toast) {
    this.toastsService.remove(toast);
  }
}
