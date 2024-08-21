import { computed, inject, Injectable, signal } from '@angular/core';
import { Todo, TodosApiService } from '@angular-todos/todos';
import { tap } from 'rxjs';

@Injectable()
export class TodosService {
  private readonly todosApiService = inject(TodosApiService);

  private readonly _todos = signal<Todo[]>([]);

  public readonly todos = this._todos.asReadonly();

  public readonly todosCount = computed(() => this._todos().length);

  getTodos() {
    return this.todosApiService.getTodos().pipe(tap((todos) => this._todos.set(todos)));
  }

  addTodo(title: string) {
    return this.todosApiService
      .addTodo(title)
      .pipe(tap((newTodo) => this._todos.update((todos) => [...todos, newTodo])));
  }

  toggleTodo(todo: Todo) {
    return this.todosApiService
      .toggleTodo(todo.id, !todo.completed)
      .pipe(
        tap((updatedTodo) =>
          this._todos.update((todos) =>
            todos.map((item) => (item.id === todo.id ? { ...todo, ...updatedTodo } : item)),
          ),
        ),
      );
  }

  deleteTodo(todo: Todo) {
    return this.todosApiService
      .deleteTodo(todo.id)
      .pipe(tap(() => this._todos.update((todos) => todos.filter((item) => item.id !== todo.id))));
  }
}
