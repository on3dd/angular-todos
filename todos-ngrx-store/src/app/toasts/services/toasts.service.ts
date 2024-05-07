import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Toast = {
  text: string;
  delay?: number;
  type?: 'default' | 'success' | 'danger';
};

@Injectable({ providedIn: 'root' })
export class ToastsService {
  private _toasts$ = new BehaviorSubject<Toast[]>([]);

  public toasts$ = this._toasts$.asObservable();

  show(toast: Toast) {
    this._toasts$.next([...this._toasts$.value, toast]);
  }

  remove(toast: Toast) {
    this._toasts$.next(this._toasts$.value.filter((item) => item !== toast));
  }
}
