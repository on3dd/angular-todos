import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';

// TODO: move environment in shared lib !
import { environment } from '../../../../apps/todos-component-based/src/environments/environment';
import { Todo } from '../models/todos.model';

@Injectable()
export class TodosApiService {
  private readonly serverUrl = `${environment.API_URL}/todos`;

  constructor(private http: HttpClient) {}

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
