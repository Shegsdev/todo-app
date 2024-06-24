function TodoFilters({ filterTodos }) {
  return (
    <div className="filters">
      <button onClick={() => filterTodos('all')}>All</button>
      <button onClick={() => filterTodos('active')}>Active</button>
      <button onClick={() => filterTodos('completed')}>Completed</button>
    </div>
  );
}

export default TodoFilters;
