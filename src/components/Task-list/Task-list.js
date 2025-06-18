import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

import './Task-list.css';

function TaskList({ tasks, onToggleDone, onDelete, onEdit, onEditSubmit, editingId, onStartTimer, onStopTimer }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          {...task}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
          onEdit={onEdit}
          onEditSubmit={onEditSubmit}
          editingId={editingId}
          onStartTimer={onStartTimer}
          onStopTimer={onStopTimer}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      done: PropTypes.bool,
      created: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
  editingId: PropTypes.number,
  onStartTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  tasks: [],
  editingId: null,
};

export default TaskList;
