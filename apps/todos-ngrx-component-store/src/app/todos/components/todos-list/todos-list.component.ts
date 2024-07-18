import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Todo } from '../../models/todos.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  items = input.required<Todo[]>();

  toggle = output<Todo>();

  delete = output<Todo>();
}
