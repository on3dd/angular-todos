import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Toast, ToastsService } from '../../services/toasts.service';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  styleUrls: ['./toasts-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastsContainerComponent {
  toasts$ = this.toastsService.toasts$;

  constructor(private readonly toastsService: ToastsService) {}

  removeToast(toast: Toast) {
    this.toastsService.remove(toast);
  }
}
