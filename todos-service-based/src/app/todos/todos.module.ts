import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TodosService } from './services/todos.service';
import { TodosInputComponent } from './components/todos-input/todos-input.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';

@NgModule({
  declarations: [TodosInputComponent, TodosListComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  providers: [TodosService],
  exports: [TodosInputComponent, TodosListComponent],
})
export class TodosModule {}
