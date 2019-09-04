import { connect } from 'react-redux';
import Todo from '../components/todo';
import { actions } from '../redux/actions';

const mapStateToProps = (state) => {
  const todoList = state.list;
  return {
    todoList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  save: (todoItem) => {
    dispatch(actions.saveTodo(todoItem));
  },
});

const TodoContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Todo);

export default TodoContainer;
