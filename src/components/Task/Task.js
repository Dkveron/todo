import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

function Task({
  id,
  label,
  done,
  created,
  onToggleDone,
  onDelete,
  onEdit,
  onEditSubmit,
  editingId,
  timeSpent,
  isTimerRunning,
  onStartTimer,
  onStopTimer,
}) {
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

  // Обратный отсчет: вычисление оставшегося времени
  const remainingTime = Math.max(0, timeSpent); // избегаем отрицательных значений
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeSpent > 0) {
      interval = setInterval(() => {
        onStartTimer(id); // теперь onStartTimer должен уменьшать значение таймера
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, id, onStartTimer, timeSpent]);

  return (
    <li className={`${done ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={() => onToggleDone(id)} checked={done} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => onStartTimer(id)} disabled={isTimerRunning} />
            <button className="icon icon-pause" onClick={() => onStopTimer(id)} disabled={!isTimerRunning} />
            {minutes}:{seconds.toString().padStart(2, '0')}
          </span>
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
