import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';

import { ToastsService } from './toasts/services/toasts.service';
import { Todo } from './todos/models/todos.model';
import { TodosService } from './todos/services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'todos-service-based';

  todos$ = new BehaviorSubject<Todo[]>([]);

  todosCount$ = this.todos$.pipe(map((todos) => todos.length));

  constructor(
    private readonly toastsService: ToastsService,
    private readonly todosService: TodosService,
  ) {}

  ngOnInit() {
    this.todosService.getTodos().subscribe((todos) => this.todos$.next(todos));
  }

  onTodoAdded(title: string) {
    this.todosService
      .addTodo(title)
      .pipe(tap(() => this.toastsService.show({ text: 'Todo has been successfully added.', type: 'success' })))
      .subscribe((newTodo) => this.todos$.next([...this.todos$.value, newTodo]));
  }

  onTodoToggled(todo: Todo) {
    this.todosService
      .toggleTodo(todo.id, !todo.completed)
      .pipe(tap(() => this.toastsService.show({ text: 'Todo has been successfully updated.', type: 'success' })))
      .subscribe((updatedTodo) =>
        this.todos$.next(this.todos$.value.map((item) => (item.id === todo.id ? { ...todo, ...updatedTodo } : item))),
      );
  }

  onTodoDeleted(todo: Todo) {
    this.todosService
      .deleteTodo(todo.id)
      .pipe(tap(() => this.toastsService.show({ text: 'Todo has been successfully deleted.', type: 'success' })))
      .subscribe(() => this.todos$.next(this.todos$.value.filter((item) => item.id !== todo.id)));
  }
}
