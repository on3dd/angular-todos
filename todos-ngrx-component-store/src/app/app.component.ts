import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastsModule } from './toasts/toasts.module';
import { Todo } from './todos/models/todos.model';
import { TodosModule } from './todos/todos.module';
import { TodosStore } from './todos/todos.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, ToastsModule, TodosModule],
  providers: [TodosStore],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'todos-ngrx-component-store';

  readonly store = inject(TodosStore);

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.store.load();
  }

  onTodoAdded(title: string) {
    this.store.add({ title });
  }

  onTodoToggled(todo: Todo) {
    this.store.toggle({ todo });
  }

  onTodoDeleted(todo: Todo) {
    this.store.delete({ todo });
  }
}
