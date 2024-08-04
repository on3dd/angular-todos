import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TodosApiService } from '@angular-todos/todos';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TodosEffects } from './todos.effects';
import { todosFeature } from './todos.reducer';

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(todosFeature),
    EffectsModule.forFeature([TodosEffects]),
  ],
  providers: [TodosApiService, provideHttpClient(withInterceptorsFromDi())],
})
export class TodosModule {}
