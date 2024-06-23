import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);

  const inputEl = useRef();

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

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
      <ul className="todos">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames({ completed: todo.completed })}
            onClick={() => {}}
          >
            <span>{todo.text}</span>
            <button
              className={classNames("btn-todo_complete", { completed: todo.completed })}
              onClick={() => toggleTodo(todo.id)}
            >
              ✔
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
