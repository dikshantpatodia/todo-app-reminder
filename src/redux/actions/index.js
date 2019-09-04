import { makeActionCreator } from '../../common/utils';

// Action Types
export const actionTypes = {
  ADD_TO_LIST: 'ADD_TO_LIST',
};

// Actions
export const actions = {
  saveTodo: makeActionCreator(actionTypes.ADD_TO_LIST, 'todoItem'),
};
