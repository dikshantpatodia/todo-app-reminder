import { actionTypes } from '../actions';
import { updateObject } from '../../common/utils';

export const initialState = {
  list: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_LIST: {
      return updateObject(state, {
        list: action.todoItem,
      });
    }

    default:
      return state;
  }
}
