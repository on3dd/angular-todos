import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Toast = {
  text: string;
  delay?: number;
  type?: 'default' | 'success' | 'danger';
};

@Injectable()
export class ToastsService {
  private _toasts = signal<Toast[]>([]);

  public toasts = this._toasts.asReadonly();

  show(toast: Toast) {
    this._toasts.set([...this._toasts(), toast]);
  }

  remove(toast: Toast) {
    this._toasts.set(this._toasts().filter((item) => item !== toast));
  }
}
