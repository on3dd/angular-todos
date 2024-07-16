import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TodosInputComponent } from './components/todos-input/todos-input.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosService } from './services/todos.service';

@NgModule({
  declarations: [TodosInputComponent, TodosListComponent],
  exports: [TodosInputComponent, TodosListComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [TodosService, provideHttpClient(withInterceptorsFromDi())],
})
export class TodosModule {}
