import { useRef } from "react";
import classNames from "classnames";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";

function TodoForm({ todoCount, newTodo, addTodo, showInput, handleShowInput, handleChange }) {
  const inputEl = useRef();

  const customShowInput = () => {
    handleShowInput()
    inputEl.current.focus();
  }

  return (
    <div className="form">
      <input
        type="text"
        ref={inputEl}
        placeholder={`${todoCount ? "What are we doing today?" : "What else are we doing today?"}`}
        value={newTodo}
        onChange={handleChange}
        className={classNames({ show: showInput })}
        onKeyUp={(event) => {
            if (event.key === 'Enter') { addTodo(); }
        }}
      />

      <span className="add-todo" onClick={() => customShowInput()}>
        <PlusIcon />
      </span>
    </div>
  );
}

export default TodoForm;
