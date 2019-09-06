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
      // eslint-disable-next-line no-alert
      alert('Title field cannot be blank');
      return;
    }

    const prevList = this.props.todoList;

    let reminder;

    if (this.reminder.value) {
      if (Date.parse(this.reminder.value) < Date.parse(new Date())) {
        // eslint-disable-next-line no-alert
        alert('The Date/Time has already passed!!');

        return;
      }
      const formattingDate = new Date(this.reminder.value).toISOString();
      reminder = new Date(formattingDate).toString();
    }

    const item = {
      id: Date.now(),
      title: this.title.value,
      description: this.description.value,
      reminder: reminder || '',
      isCompleted: false,
    };

    const updatedList = [...prevList, item];

    // Saving to redux state
    this.props.save(updatedList);

    this.resetValues();
  };

  // Reset values
  resetValues = () => {
    this.title.value = '';
    this.description.value = '';
    this.reminder.value = '';
  };

  // delete item
  deleteItem = (id) => {
    const updatedList = this.props.todoList.filter((item) => item.id !== id);
    this.props.save(updatedList);
  };

  // mark as complete/incomplete
  markAsComplete = (currentTime) => {
    const tempList = this.props.todoList;

    tempList.forEach((elem) => {
      if (Date.parse(elem.reminder) === currentTime) {
        elem.isCompleted = !elem.isCompleted;
      }
    });

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
            <input
              type="datetime-local"
              className="input-datetime"
              ref={(rem) => { this.reminder = rem; }}
            />
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
          markAsComplete={this.markAsComplete}
        />
      </React.Fragment>
    );
  }
}

export default Todo;
