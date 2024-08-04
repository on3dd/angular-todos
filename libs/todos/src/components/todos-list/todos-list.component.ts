import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Todo } from '../../models/todos.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  items = input<Todo[]>([]);

  toggle = output<Todo>();

  delete = output<Todo>();

  todosTrackBy(_idx: number, todo: Todo) {
    return todo.id;
  }
}
