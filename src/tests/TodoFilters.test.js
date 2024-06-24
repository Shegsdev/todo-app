import { render, fireEvent } from "@testing-library/react";
import TodoFilters from "../components/TodoFilters";

describe('TodoFilters component', () => {
  const todos = [
    {
      id: 1,
      title: 'Todo 1',
      completed: false,
      date: new Date().toDateString()
    },
    {
      id: 2,
      title: 'Todo 2',
      completed: true,
      date: new Date().toDateString()
    },
  ];

  it('should render all fiter options', () => {
    const { getByText } = render(<TodoFilters todos={todos} countActiveTodos={() => 1} />);
    expect(getByText('All')).toBeInTheDocument();
    expect(getByText('Active')).toBeInTheDocument();
    expect(getByText('Completed')).toBeInTheDocument();
  });

  // it('should render correct count of completed todos when Completed filter clicked', () => {
  //   const { getByText, getByTestId } = render(<TodoFilters todos={todos} />);
  //   const completedFilterButton = getByText('Completed');

  //   fireEvent.click(completedFilterButton);

  //   // Assert that only 1 completed todo is rendered
  //   expect(getByTestId('todo-item-2')).toBeInTheDocument();
  //   expect(queryByTestId('todo-item-1')).toBeNull();
  // });
});
