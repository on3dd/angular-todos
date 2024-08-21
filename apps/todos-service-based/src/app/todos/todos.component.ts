import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ToastsService } from '@angular-todos/toasts';
import { Todo, TodosModule } from '@angular-todos/todos';

import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodosModule],
  providers: [TodosService],
  templateUrl: './todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  private readonly toastsService = inject(ToastsService);

  private readonly todosService = inject(TodosService);

  public readonly todos = this.todosService.todos;

  public readonly todosCount = this.todosService.todosCount;

  ngOnInit() {
    this.todosService.getTodos().subscribe();
  }

  onTodoAdded(title: string) {
    this.todosService
      .addTodo(title)
      .subscribe(() => this.toastsService.show({ text: 'Todo has been successfully added.', type: 'success' }));
  }

  onTodoToggled(todo: Todo) {
    this.todosService
      .toggleTodo(todo)
      .subscribe(() => this.toastsService.show({ text: 'Todo has been successfully updated.', type: 'success' }));
  }

  onTodoDeleted(todo: Todo) {
    this.todosService
      .deleteTodo(todo)
      .subscribe(() => this.toastsService.show({ text: 'Todo has been successfully deleted.', type: 'success' }));
  }
}
