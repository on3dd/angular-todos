import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
  exports: [TodosInputComponent, TodosListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(todosFeature),
    EffectsModule.forFeature([TodosEffects]),
  ],
  providers: [TodosService, provideHttpClient(withInterceptorsFromDi())],
})
export class TodosModule {}
