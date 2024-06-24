import { useState, useEffect } from "react";
import classNames from "classnames";
import TodoFilters from "../components/TodoFilters";
import TodoForm from "../components/TodoForm";
import { useAuth } from "../context/AuthContext";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState(() => todos);

  const { user } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
          throw new Error('Error fetching todos');
        }
        const data = await response.json();
        setTodos(data.slice(0, 10));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    setFilteredTodos(todos)
  }, [todos]);

  const toggleTodo = (e, id) => {
    e.stopPropagation();

    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSelect = (id) => {
    if (selectedTodo !== id) {
      setSelectedTodo(id);
      setShowDeletePrompt(true);
    } else {
      setSelectedTodo(null);
      setShowDeletePrompt(false);
    }
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
          <h1>Hello, {user?.firstName} { todos.length > 0 ? 'here are your daily tasks' : 'click the button to add a task'}</h1>
      </header>

      <TodoForm
        todoCount={todos.length}
        handleError={setError}
        handleSetTodos={setTodos} />

      { (todos.length > 0 && !loading) && (<TodoFilters filterTodos={filterTodos} />)}

      {loading ? (
          <div className="loader-wrapper">
          <div className="loading-indicator"></div>
          </div>
      ) : error ? (
          <div className="error-message">{error}</div>
      ) : (
          <ul className="todos">
          {filteredTodos.map(todo => (
              <li
              key={todo.id}
              onClick={() => handleSelect(todo.id)}
              >
              <div
                  className={classNames("delete-todo", { show: (selectedTodo === todo.id) && showDeletePrompt })}
                  onClick={() => handleSelect(todo.id)}
              >
                  <span onClick={() => removeTodo(todo.id)}>🗑 Delete</span>
                  <span>Cancel</span>
              </div>
              <span
                  className={classNames({
                  hidden: (selectedTodo === todo.id) && showDeletePrompt,
                  completed: todo.completed
                  })}
              >
                  {todo.title}
              </span>
              <button
                  className={classNames("btn-todo_complete", { completed: todo.completed, hidden: (selectedTodo === todo.id) && showDeletePrompt })}
                  onClick={(e) => toggleTodo(e, todo.id)}
                  data-testid="todo-checkbox"
              >
                  ✔
              </button>
              </li>
          ))}
          </ul>
      )}
      </div>
  );
}

export default Todo;
