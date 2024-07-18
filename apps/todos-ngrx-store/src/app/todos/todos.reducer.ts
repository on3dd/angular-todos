import { createFeature, createReducer, on } from '@ngrx/store';

import { Todo } from './models/todos.model';
import { TodosActions } from './todos.actions';

type InitialState = {
  todos: Todo[];
  loading: boolean;
};

const initialState: InitialState = {
  todos: [],
  loading: true,
};

export const todosFeature = createFeature({
  name: 'todos',
  reducer: createReducer(
    initialState,
    on(TodosActions.error, (state) => ({
      ...state,
      loading: false,
    })),

    on(TodosActions.load, TodosActions.add, TodosActions.toggle, TodosActions.delete, (state) => ({
      ...state,
      loading: true,
    })),

    on(TodosActions.loadSuccess, (state, payload) => ({
      ...state,
      loading: false,
      todos: payload.todos,
    })),

    on(TodosActions.addSuccess, (state, { todo }) => ({
      ...state,
      loading: false,
      todos: [...state.todos, todo],
    })),

    on(TodosActions.toggleSuccess, (state, payload) => ({
      ...state,
      loading: false,
      todos: state.todos.map((item) => (item.id === payload.id ? { ...item, completed: payload.completed } : item)),
    })),

    on(TodosActions.deleteSuccess, (state, payload) => ({
      ...state,
      loading: false,
      todos: state.todos.filter((item) => item.id !== payload.id),
    })),
  ),
});
