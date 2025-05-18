import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

function Task({ id, label, done, created, onToggleDone, onDelete, onEdit, onEditSubmit, editingId }) {
  const [editText, setEditText] = useState(label);
  const isEditing = editingId === id;

  const handleChange = (e) => setEditText(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEditSubmit(id, editText.trim());
    }
  };

  const handleBlur = () => {
    onEditSubmit(id, editText.trim());
  };

  return (
    <li className={`${done ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={() => onToggleDone(id)} checked={done} />
        <label>
          <span className="description">{label}</span>
          <span className="created">created {formatDistanceToNow(new Date(created), { addSuffix: true })}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={() => onEdit(id)} />
        <button type="button" className="icon icon-destroy" onClick={() => onDelete(id)} />
      </div>
      {isEditing && (
        <input
          type="text"
          className="edit"
          value={editText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
        />
      )}
    </li>
  );
}

export default Task;
