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

  const onAdd = (newTask) => {
    const taskWithId = {
      id: Date.now(),
      ...newTask,
    };
    setTasks([...tasks, taskWithId]);
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
