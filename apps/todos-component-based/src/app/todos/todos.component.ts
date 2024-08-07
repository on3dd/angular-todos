import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ToastsService } from '@angular-todos/toasts';
import { Todo, TodosApiService, TodosModule } from '@angular-todos/todos';
import { tap } from 'rxjs';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodosModule],
  templateUrl: './todos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent implements OnInit {
  private readonly toastsService = inject(ToastsService);

  private readonly todosService = inject(TodosApiService);

  todos = signal<Todo[]>([]);

  todosCount = computed(() => this.todos().length);

  ngOnInit() {
    this.todosService.getTodos().subscribe((todos) => this.todos.set(todos));
  }

  onTodoAdded(title: string) {
    this.todosService
      .addTodo(title)
      .pipe(tap(() => this.toastsService.show({ text: 'Todo has been successfully added.', type: 'success' })))
      .subscribe((newTodo) => this.todos.update((todos) => [...todos, newTodo]));
  }

  onTodoToggled(todo: Todo) {
    this.todosService
      .toggleTodo(todo.id, !todo.completed)
      .pipe(tap(() => this.toastsService.show({ text: 'Todo has been successfully updated.', type: 'success' })))
      .subscribe((updatedTodo) =>
        this.todos.update((todos) => todos.map((item) => (item.id === todo.id ? { ...todo, ...updatedTodo } : item))),
      );
  }

  onTodoDeleted(todo: Todo) {
    this.todosService
      .deleteTodo(todo.id)
      .pipe(tap(() => this.toastsService.show({ text: 'Todo has been successfully deleted.', type: 'success' })))
      .subscribe(() => this.todos.update((todos) => todos.filter((item) => item.id !== todo.id)));
  }
}
