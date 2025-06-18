import React, { useState } from 'react';

import './App.css';
import TaskList from '../Task-list/Task-list';
import NewTaskForm from '../New-task-form/New-task-form';
import Footer from '../Footer/Footer';

function App() {
  const [tasks, setTasks] = useState([]);

  const [filter, setFilter] = useState('all');

  const [editingId, setEditingId] = useState(null);

  const onToggleDone = (id) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
    setTasks(updatedTasks);
  };

  const onDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.done));
  };

  const onAdd = (label, minutes = 0, seconds = 0) => {
    const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    const newTask = {
      id: Date.now(),
      label,
      done: false,
      created: Date.now(),
      timeSpent: totalSeconds,
      isTimerRunning: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const onEdit = (id) => {
    setEditingId(id);
  };

  const onEditSubmit = (id, newLabel) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, label: newLabel } : task));
    setTasks(updatedTasks);
    setEditingId(null);
  };

  const startTimer = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isTimerRunning: true } : task)));
  };

  const stopTimer = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isTimerRunning: false } : task)));
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.isTimerRunning && task.timeSpent > 0) {
            return { ...task, timeSpent: task.timeSpent - 1 };
          }
          return task;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [setTasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done;
    if (filter === 'done') return task.done;
    return true;
  });

  return (
    <section className="todoapp">
      <NewTaskForm onAdd={onAdd} />
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onToggleDone={onToggleDone}
          onDelete={onDelete}
          onEdit={onEdit}
          onEditSubmit={onEditSubmit}
          editingId={editingId}
          onStartTimer={startTimer}
          onStopTimer={stopTimer}
        />
        <Footer
          count={tasks.filter((task) => !task.done).length}
          filter={filter}
          onFilterChange={changeFilter}
          onClearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}

App.propTypes = {};

App.defaultProps = {};

export default App;
