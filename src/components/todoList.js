import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    deleteItem: PropTypes.func,
    updateItem: PropTypes.func,
    toggleMarkAsComplete: PropTypes.func,
  };

  render() {
    const { list } = this.props;

    console.log('list: ', list);

    return (
      list.length ? (
        <div className='list-container'>
          {
            list.map((item) => (
              <div
                key={item.id}
                className='list-item'
                style={{ borderTop: `4px solid ${item.color}AA` }}
              >
                {/* mark as complete */}
                <input
                  type='checkbox'
                  title={item.isCompleted ? 'Mark as undone' : 'Mark as done'}
                  value={item.isCompleted}
                  className='list-item-mark'
                  onChange={() => this.props.toggleMarkAsComplete(item.id)}
                />

                {/* display title */}
                <input
                  type='text'
                  defaultValue={item.title}
                  className={item.isCompleted ? 'list-item-edit list-item-completed' : 'list-item-edit'}
                  onChange={(e) => this.props.updateItem(e, item.id, 'title')}
                  placeholder={'title'}
                  title={'Click to edit'}
                />

                {/* display description */}
                <textarea
                  rows="3"
                  columns="4"
                  defaultValue={item.description}
                  className={item.isCompleted ? 'list-item-desc list-item-completed' : 'list-item-desc'}
                  onChange={(e) => this.props.updateItem(e, item.id, 'description')}
                  placeholder={'description'}
                  title={'Click to edit'}
                ></textarea>

                {/* delete item */}
                <div
                  title='Delete'
                  className='list-item-delete'
                  onClick={() => this.props.deleteItem(item.id)}
                >&times;</div>
              </div>
            ))
          }
        </div>
      ) : null
    );
  }
}

export default TodoList;
