import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TodosApiService, TodosModule as TodosUIModule } from '@angular-todos/todos';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TodosComponent } from './todos.component';
import { TodosEffects } from './todos.effects';
import { todosFeature } from './todos.reducer';

@NgModule({
  declarations: [TodosComponent],
  exports: [TodosComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(todosFeature),
    EffectsModule.forFeature([TodosEffects]),
    TodosUIModule,
  ],
  providers: [TodosApiService, provideHttpClient(withInterceptorsFromDi())],
})
export class TodosModule {}
