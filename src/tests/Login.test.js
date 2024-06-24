import { render, fireEvent } from "@testing-library/react";
import Login from "../components/auth/Login";
import { AuthProvider } from "../context/AuthContext";

describe('Login component', () => {
  it('should render login form', () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Login to continue')).toBeInTheDocument();
  });

  it('should call login function on form submit', () => {
    const loginMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <AuthProvider value={{ login: loginMock }}>
        <Login />
      </AuthProvider>
    );
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'emilys' } });
    fireEvent.change(passwordInput, { target: { value: 'emilyspass' } });
    fireEvent.click(loginButton);

    expect(loginMock).toHaveBeenCalledTimes(1);
  });
});
