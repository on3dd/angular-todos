import { Injectable } from '@angular/core';
import { ToastsService } from '@angular-todos/toasts';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { TodosService } from './services/todos.service';
import { TodosActions } from './todos.actions';

@Injectable()
export class TodosEffects {
  loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.load),
      mergeMap(() =>
        this.todosService.getTodos().pipe(
          map((todos) => TodosActions.loadSuccess({ todos })),
          catchError(() => of(TodosActions.error())),
        ),
      ),
    );
  });

  addTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.add),
      mergeMap((action) =>
        this.todosService.addTodo(action.title).pipe(
          map((newTodo) => TodosActions.addSuccess({ todo: newTodo })),
          catchError(() => of(TodosActions.error())),
        ),
      ),
    );
  });

  addTodoSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TodosActions.addSuccess),
        tap(() => this.toastsService.show({ text: 'Todo has been successfully added.', type: 'success' })),
      );
    },
    { dispatch: false },
  );

  toggleTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.toggle),
      mergeMap(({ todo }) =>
        this.todosService.toggleTodo(todo.id, !todo.completed).pipe(
          map((updatedTodo) => TodosActions.toggleSuccess({ id: todo.id, completed: updatedTodo.completed })),
          catchError(() => of(TodosActions.error())),
        ),
      ),
    );
  });

  toggleTodoSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TodosActions.toggleSuccess),
        tap(() => this.toastsService.show({ text: 'Todo has been successfully updated.', type: 'success' })),
      );
    },
    { dispatch: false },
  );

  deleteTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.delete),
      mergeMap(({ id }) =>
        this.todosService.deleteTodo(id).pipe(
          map(() => TodosActions.deleteSuccess({ id })),
          catchError(() => of(TodosActions.error())),
        ),
      ),
    );
  });

  deleteTodoSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TodosActions.deleteSuccess),
        tap(() => this.toastsService.show({ text: 'Todo has been successfully deleted.', type: 'success' })),
      );
    },
    { dispatch: false },
  );

  error$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TodosActions.error),
        tap(() => this.toastsService.show({ text: 'Something went wrong, please try again later.', type: 'danger' })),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private todosService: TodosService,
    private toastsService: ToastsService,
  ) {}
}
