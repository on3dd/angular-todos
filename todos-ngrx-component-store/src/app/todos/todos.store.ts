import { inject, Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { map, mergeMap, tap } from 'rxjs';

import { ToastsService } from '../toasts/services/toasts.service';
import { Todo } from './models/todos.model';
import { TodosService } from './services/todos.service';

type TodosState = {
  todos: Todo[];
  loading: boolean;
};

@Injectable()
export class TodosStore extends ComponentStore<TodosState> {
  private readonly todosService = inject(TodosService);
  private readonly toastsService = inject(ToastsService);

  private readonly loading$ = this.select((state) => state.loading);
  private readonly todos$ = this.select((state) => state.todos);
  private readonly todosCount$ = this.todos$.pipe(map((todos) => todos.length));

  readonly vm$ = this.select({ loading: this.loading$, todos: this.todos$, todosCount: this.todosCount$ });

  constructor() {
    super({ todos: [], loading: true });
  }

  load = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      mergeMap(() =>
        this.todosService.getTodos().pipe(
          tapResponse(
            (todos) => this.addTodos(todos),
            (_err) => this.handleError(),
          ),
        ),
      ),
    ),
  );

  add = this.effect<{ title: string }>((trigger$) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      mergeMap((payload) =>
        this.todosService.addTodo(payload.title).pipe(
          tapResponse(
            (newTodo) => {
              this.addTodo(newTodo);
              this.toastsService.show({ text: 'Todo has been successfully added.', type: 'success' });
            },
            (_err) => this.handleError(),
          ),
        ),
      ),
    ),
  );

  toggle = this.effect<{ todo: Todo }>((trigger$) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      mergeMap(({ todo }) =>
        this.todosService.toggleTodo(todo.id, !todo.completed).pipe(
          tapResponse(
            (updatedTodo) => {
              this.toggleTodo({ ...todo, ...updatedTodo });
              this.toastsService.show({ text: 'Todo has been successfully updated.', type: 'success' });
            },
            (_err) => this.handleError(),
          ),
        ),
      ),
    ),
  );

  delete = this.effect<{ todo: Todo }>((trigger$) =>
    trigger$.pipe(
      tap(() => this.setIsLoading(true)),
      mergeMap(({ todo }) =>
        this.todosService.deleteTodo(todo.id).pipe(
          tapResponse(
            () => {
              this.deleteTodo(todo);
              this.toastsService.show({ text: 'Todo has been successfully deleted.', type: 'success' });
            },
            (_err) => this.handleError(),
          ),
        ),
      ),
    ),
  );

  private setIsLoading = this.updater<boolean>((state, payload): TodosState => ({ ...state, loading: payload }));

  private addTodos = this.updater<Todo[]>(
    (state, payload): TodosState => ({ ...state, loading: false, todos: payload }),
  );

  private addTodo = this.updater<Todo>(
    (state, payload): TodosState => ({ ...state, loading: false, todos: [...state.todos, payload] }),
  );

  private toggleTodo = this.updater<Todo>(
    (state, payload): TodosState => ({
      ...state,
      loading: false,
      todos: state.todos.map((item) => (item.id === payload.id ? { ...item, completed: payload.completed } : item)),
    }),
  );

  private deleteTodo = this.updater<Todo>(
    (state, payload): TodosState => ({
      ...state,
      loading: false,
      todos: state.todos.filter((item) => item.id !== payload.id),
    }),
  );

  private handleError() {
    this.toastsService.show({ text: 'Something went wrong, please try again later.', type: 'danger' });
  }
}
