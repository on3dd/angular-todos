import { createSelector } from '@ngrx/store';

import { todosFeature } from './todos.reducer';

export const selectTodosViewModel = createSelector(
  todosFeature.selectTodos,
  todosFeature.selectLoading,
  (todos, loading) => ({ loading, todos, todosCount: todos.length }),
);
