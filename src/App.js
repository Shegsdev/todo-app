import React, { Fragment, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState(() => todos);

  const inputEl = useRef();

  useEffect(() => {
    setFilteredTodos(todos)
  }, [todos]);

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleShowInput = () => {
    setShowInput(true);
    inputEl.current.focus();
  }

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: uuidv4(),
        text: newTodo,
        completed: false,
        date: new Date().toDateString()
      };
      setTodos((todos) => {
        return [...todos, todo]
      });
      setNewTodo('');
    }
  };

  const toggleTodo = (e, id) => {
    e.stopPropagation();

    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSelect = (id) => {
    if (selectedTodo !== id) setSelectedTodo(id);
    else setSelectedTodo(null);

    setShowDeletePrompt(!showDeletePrompt);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filterTodos = (filter) => {
    switch (filter) {
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  return (
    <div className="todoapp">
      <header>
        <p className="date">{ new Date().toDateString() }</p>
        <h1>Hello, { todos.length > 0 ? 'here are your daily tasks' : 'click the button to add a task'}</h1>
      </header>
      <div className="form">
        <input
          type="text"
          ref={inputEl}
          placeholder={`${todos.length == 0 ? "What are we doing today?" : "What else are we doing today?"}`}
          value={newTodo}
          onChange={handleChange}
          className={classNames({ show: showInput })}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              addTodo();
            }
          }}
        />

        <span className="add-todo" onClick={() => newTodo ? addTodo() : handleShowInput()}>
          { showInput && newTodo ? 'Add' : 'New'}
        </span>
      </div>

      { todos.length > 0 && (
      <div className="filters">
        <button onClick={() => filterTodos('all')}>All</button>
        <button onClick={() => filterTodos('active')}>Active</button>
        <button onClick={() => filterTodos('completed')}>Completed</button>
      </div>)}

      <ul className="todos">
        {filteredTodos.map(todo => (
          <Fragment key={todo.id}>
            <div
              className={classNames("delete-todo", { show: (selectedTodo === todo.id) && showDeletePrompt })}
              onClick={() => handleSelect(todo.id)}
            >
              <span onClick={() => removeTodo(todo.id)}>🗑 Delete</span>
              </div>
            <li
              className={classNames({ completed: todo.completed })}
              onClick={() => handleSelect(todo.id)}
            >
              <span>{todo.text}</span>
              <button
                className={classNames("btn-todo_complete", { completed: todo.completed })}
                onClick={(e) => toggleTodo(e, todo.id)}
              >
                ✔
              </button>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default App;
