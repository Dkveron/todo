import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './New-task-form.css';

function NewTaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, parseInt(minutes) || 0, parseInt(seconds) || 0);
      setText('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={handleSubmit}>
        <input
          id="new-task-input"
          name="newTask"
          className="new-todo"
          placeholder="Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          style={{ appearance: 'textfield' }}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          style={{ appearance: 'textfield' }}
        />
        <button type="submit" style={{ display: 'none' }} />
      </form>
    </header>
  );
}

export default NewTaskForm;

NewTaskForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
