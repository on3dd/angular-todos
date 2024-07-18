import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Todo } from './todos/models/todos.model';
import { TodosActions } from './todos/todos.actions';
import { selectTodosViewModel } from './todos/todos.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'todos-ngrx-store';

  readonly todosVm$ = this.store.select(selectTodosViewModel);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(TodosActions.load());
  }

  onTodoAdded(title: string) {
    this.store.dispatch(TodosActions.add({ title }));
  }

  onTodoToggled(todo: Todo) {
    this.store.dispatch(TodosActions.toggle({ todo }));
  }

  onTodoDeleted(todo: Todo) {
    this.store.dispatch(TodosActions.delete({ id: todo.id }));
  }
}
