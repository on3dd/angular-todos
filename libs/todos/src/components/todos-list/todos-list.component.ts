import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Todo } from '../../models/todos.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  @Input() items: Todo[] = [];

  @Output() toggle = new EventEmitter<Todo>();

  @Output() delete = new EventEmitter<Todo>();

  todosTrackBy(_idx: number, todo: Todo) {
    return todo.id;
  }
}
