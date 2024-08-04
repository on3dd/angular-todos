import { Component } from '@angular/core';
import { ToastsModule } from '@angular-todos/toasts';

import { TodosComponent } from './todos/todos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToastsModule, TodosComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'todos-ngrx-component-store';
}
