import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleChange = (event) => {
    setNewTodo(event.target.value);
  };

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

  return (
    <div className="todoapp">
      <header>
        <p className="date">{ new Date().toDateString() }</p>
        <h1>Hello, { todos.length > 0 ? 'here are your daily tasks' : 'click the button to add a task'}</h1>
      </header>
      <div className="form">
        <input
          type="text"
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

        <button className="btn-add" onClick={() => newTodo ? addTodo() : setShowInput(true)}>
          { showInput && newTodo ? '✔' : '+'}
        </button>
      </div>
      <ul className="todos">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames({ completed: todo.completed })}
            onClick={() => {}}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
