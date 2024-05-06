import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { shareReplay } from 'rxjs';

import { environment } from '~/environments/environment';

import { Todo } from '../models/todos.model';

@Injectable()
export class TodosService {
  private readonly http = inject(HttpClient);

  private readonly serverUrl = `${environment.API_URL}/todos`;

  getTodos() {
    return this.http.get<Todo[]>(this.serverUrl, { params: { _limit: 10 } }).pipe(shareReplay(1));
  }

  addTodo(title: string) {
    return this.http.post<Todo>(`${this.serverUrl}`, { title });
  }

  toggleTodo(id: number, value: boolean) {
    return this.http.patch<Todo>(`${this.serverUrl}/${id}`, { completed: value });
  }

  deleteTodo(id: number) {
    return this.http.delete<void>(`${this.serverUrl}/${id}`);
  }
}
