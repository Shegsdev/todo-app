import { render, fireEvent } from "@testing-library/react";
import TodoForm from "../components/TodoForm";

describe('TodoForm component', () => {
  it('should render input and button', () => {
    const { getByPlaceholderText, getByText } = render(<TodoForm />);
    expect(getByPlaceholderText('What else are we doing today?')).toBeInTheDocument();
    expect(getByText('Add')).toBeInTheDocument();
  });

  it('should call addTodo function on form submit', () => {
    const addTodoMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(<TodoForm addTodo={addTodoMock} />);
    const input = getByPlaceholderText('What else are we doing today?');

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.submit(input);

    expect(addTodoMock).toHaveBeenCalledTimes(1);
    expect(addTodoMock).toHaveBeenCalledWith('Test Todo');
  });
});
