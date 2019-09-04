import React from 'react';
import TodoContainer from './todoContainer';

const Root = () => (
  <div className="app">
    <div className='app-header'>{'Todo App'}</div>
    <TodoContainer />
  </div>
);

export default Root;
