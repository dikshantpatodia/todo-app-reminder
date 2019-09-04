import React from 'react';
import PropTypes from 'prop-types';
import InputList from './todoList';

class Todo extends React.Component {
  static propTypes = {
    save: PropTypes.func,
    todoList: PropTypes.array,
  };

  // add item to list
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.title.value || this.title.value[0] === ' ') {
      alert('Field cannot be blank');
      return;
    }

    const prevList = this.props.todoList;

    const item = {
      id: Date.now(),
      title: this.title.value,
      description: this.description.value,
      // reminder: this.reminder.value,
      isCompleted: false,
    };

    const updatedList = [...prevList, item];

    // Saving to redux state
    this.props.save(updatedList);

    this.title.value = '';
    this.description.value = '';
  };

  // delete item
  deleteItem = (id) => {
    const updatedList = this.props.todoList.filter((item) => item.id !== id);
    console.log('updated list: ', updatedList);
    this.props.save(updatedList);
  };

  // mark as complete/incomplete
  toggleMarkAsComplete = (id) => {
    const tempList = this.props.todoList;

    tempList.forEach((elem) => {
      if (elem.id === id) {
        elem.isCompleted = !elem.isCompleted;
      }
    });

    console.log('updated list: ', tempList);

    this.props.save(tempList);
  };

  // update item
  updateItem = (e, id, type) => {
    const tempList = this.props.todoList;

    tempList.forEach((elem) => {
      if (elem.id === id) {
        elem[type] = e.target.value;
      }
    });

    this.props.save(tempList);
  }

  render() {
    const { todoList } = this.props;

    console.log('todoList: ', this.props.todoList);

    return (
      <React.Fragment>
        <div className='input-container'>
          <form onSubmit={this.handleSubmit} className='form'>
            <input
              type='text'
              className='input input-title'
              placeholder={'title'}
              ref={(title) => { this.title = title; }}
              autoFocus
            />
            <textarea
              rows="4"
              className='input input-description'
              placeholder={'description'}
              ref={(desc) => { this.description = desc; }}
            ></textarea>
            <div className='submit'>
              <button type="submit" className='submit-btn'>ADD</button>
            </div>
          </form>
        </div>

        {/* Show the list items */}
        <InputList
          list={todoList}
          deleteItem={this.deleteItem}
          updateItem={this.updateItem}
          toggleMarkAsComplete={this.toggleMarkAsComplete}
        />
      </React.Fragment>
    );
  }
}

export default Todo;
