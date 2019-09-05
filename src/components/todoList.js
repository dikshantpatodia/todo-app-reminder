import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    deleteItem: PropTypes.func,
    updateItem: PropTypes.func,
    markAsComplete: PropTypes.func,
  };

  state = {
    currentTime: null,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentTime: Date.parse(new Date()),
      });
    }, 1000);
  }

  checkReminder = (reminder) => {
    if (this.state.currentTime === Date.parse(reminder)) {
      this.props.markAsComplete(this.state.currentTime);
    }

    return this.state.currentTime === Date.parse(reminder);
  }

  render() {
    const { list } = this.props;

    return (
      list && list.length ? (
        <div className='list-container'>
          {
            list.map((item) => (
              <div
                key={item.id}
                className='list-item'
              >
                {/* display reminder (if available) */}
                {
                  item.reminder && (
                    <div className={`list-item__reminder ${item.isCompleted && 'list-item__reminder-completed'}`}>
                      {
                        // eslint-disable-next-line no-nested-ternary
                        this.checkReminder(item.reminder) ? (
                          // eslint-disable-next-line no-alert
                          alert(`Reminding your TODO: ${item.title}`)
                        ) : (
                          item.isCompleted ? (
                            'TODO'
                          ) : (
                            `Due on ${item.reminder}`
                          )
                        )
                      }
                    </div>
                  )
                }

                {/* display title */}
                <input
                  type='text'
                  defaultValue={item.title}
                  className={item.isCompleted ? 'list-item-edit list-item-completed' : 'list-item-edit'}
                  onChange={(e) => this.props.updateItem(e, item.id, 'title')}
                  placeholder={'title'}
                  title={'Click to edit title'}
                />

                {/* display description */}
                <textarea
                  rows="6"
                  columns="4"
                  defaultValue={item.description}
                  className={item.isCompleted ? 'list-item-desc list-item-completed' : 'list-item-desc'}
                  onChange={(e) => this.props.updateItem(e, item.id, 'description')}
                  placeholder={'description'}
                  title={'Click to edit description'}
                ></textarea>

                {/* delete item */}
                <div
                  title='Delete this item'
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
