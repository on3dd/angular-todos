import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Todo } from './models/todos.model';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ todos: Todo[] }>(),

    Add: props<{ title: string }>(),
    'Add Success': props<{ todo: Todo }>(),

    Toggle: props<{ todo: Todo }>(),
    'Toggle Success': props<Pick<Todo, 'id' | 'completed'>>(),

    Delete: props<{ id: number }>(),
    'Delete Success': props<{ id: number }>(),

    Error: emptyProps(),
  },
});
