import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './New-task-form.css';

function NewTaskForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd({
        label: text,
        done: false,
        created: new Date(),
      });
      setText('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <label htmlFor="new-task-input" className="visually-hidden">
          New Task
        </label>
        <input
          id="new-task-input"
          name="newTask"
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
}

export default NewTaskForm;

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
