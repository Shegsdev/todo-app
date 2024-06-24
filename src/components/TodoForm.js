import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";

function TodoForm({ todoCount, handleSetTodos, handleError }) {
  const inputEl = useRef();
  const [newTodo, setNewTodo] = useState('');
  const [showInput, setShowInput] = useState(false);


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
        
      };
      handleSetTodos((todos) => {
        return [todo, ...todos]
      });
      setNewTodo('');
      handleError(false);
    }
  };

  return (
    <div className="form">
      <input
        type="text"
        ref={inputEl}
        placeholder={`${todoCount == 0 ? "What are we doing today?" : "What else are we doing today?"}`}
        value={newTodo}
        onChange={handleChange}
        className={classNames({ show: showInput })}
        onKeyUp={(event) => {
            if (event.key === 'Enter') { addTodo(); }
        }}
      />

      <span className="add-todo" onClick={() => handleShowInput()}>
        <PlusIcon />
      </span>
    </div>
  );
}

export default TodoForm;
