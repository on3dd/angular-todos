import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TodosInputComponent } from './components/todos-input/todos-input.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosService } from './services/todos.service';
import { TodosEffects } from './todos.effects';
import { todosFeature } from './todos.reducer';

@NgModule({
  declarations: [TodosInputComponent, TodosListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature(todosFeature),
    EffectsModule.forFeature([TodosEffects]),
  ],
  providers: [TodosService],
  exports: [TodosInputComponent, TodosListComponent],
})
export class TodosModule {}
