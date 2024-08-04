import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Todo } from '@angular-todos/todos';
import { Store } from '@ngrx/store';

import { TodosActions } from './todos.actions';
import { selectTodosViewModel } from './todos.selectors';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  private readonly store = inject(Store);

  readonly todosVm$ = this.store.select(selectTodosViewModel);

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
