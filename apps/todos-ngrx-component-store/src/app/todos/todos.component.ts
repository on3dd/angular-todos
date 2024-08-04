import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Todo, TodosModule } from '@angular-todos/todos';

import { TodosStore } from './todos.store';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [AsyncPipe, TodosModule],
  providers: [TodosStore],
  templateUrl: './todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  readonly store = inject(TodosStore);

  readonly vm$ = this.store.vm$;

  ngOnInit(): void {
    this.store.load();
  }

  onTodoAdded(title: string) {
    this.store.add({ title });
  }

  onTodoToggled(todo: Todo) {
    this.store.toggle({ todo });
  }

  onTodoDeleted(todo: Todo) {
    this.store.delete({ todo });
  }
}
