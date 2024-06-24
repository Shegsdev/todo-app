import { render } from "@testing-library/react";
import TodoList from "../containers/TodoList";
import { AuthProvider } from "../context/AuthContext";

const MockAuthProvider = ({ children }) => (
  <AuthProvider value={{ todos: [], toggleTodo: jest.fn(), removeTodo: jest.fn() }}>
    {children}
  </AuthProvider>
);

describe('TodoList component', () => {
  it('should render todos correctly', () => {
    const { getByText } = render(
      <MockAuthProvider>
        <TodoList />
      </MockAuthProvider>
    );
    // Example assertion for rendering todos
    expect(getByText('No todos')).toBeInTheDocument();
  });

  it('should call toggleTodo function when button clicked', () => {
    const { getByTestId } = render(
      <MockAuthProvider>
        <TodoList />
      </MockAuthProvider>
    );
    const checkbox = getByTestId('todo-checkbox');

    fireEvent.click(checkbox);

    expect(MockAuthProvider.toggleTodo).toHaveBeenCalledTimes(1);
    expect(MockAuthProvider.toggleTodo).toHaveBeenCalledWith(1);
  });
});
