import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { tap } from 'rxjs';

import { ToastsService } from './toasts/services/toasts.service';
import { ToastsModule } from './toasts/toasts.module';
import { Todo } from './todos/models/todos.model';
import { TodosService } from './todos/services/todos.service';
import { TodosModule } from './todos/todos.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToastsModule, TodosModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'todos-service-based-signals';

  private readonly toastsService = inject(ToastsService);

  private readonly todosService = inject(TodosService);

  todos = signal<Todo[]>([]);

  todosCount = computed(() => this.todos().length);

  ngOnInit() {
    this.todosService.getTodos().subscribe((todos) => this.todos.set(todos));
  }

  onTodoAdded(title: string) {
    this.todosService
      .addTodo(title)
      .pipe(tap(() => this.toastsService.show({ text: 'Todo has been successfully added.', type: 'success' })))
      .subscribe((newTodo) => this.todos.update((todos) => [...todos, newTodo]));
  }

  onTodoToggled(todo: Todo) {
    this.todosService
      .toggleTodo(todo.id, !todo.completed)
      .pipe(tap(() => this.toastsService.show({ text: 'Todo has been successfully updated.', type: 'success' })))
      .subscribe((updatedTodo) =>
        this.todos.update((todos) => todos.map((item) => (item.id === todo.id ? { ...todo, ...updatedTodo } : item))),
      );
  }

  onTodoDeleted(todo: Todo) {
    this.todosService
      .deleteTodo(todo.id)
      .pipe(tap(() => this.toastsService.show({ text: 'Todo has been successfully deleted.', type: 'success' })))
      .subscribe(() => this.todos.update((todos) => todos.filter((item) => item.id !== todo.id)));
  }
}
