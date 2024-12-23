// Fixing the import statements
import { render, screen, fireEvent, waitFor } from '@testing-library/react';  // Corrected: missing 'from'
import '@testing-library/jest-dom';  // Corrected: should be in the correct order and format
import Login from './Login';  // Fixed: corrected file path and capitalization of Login
import { useNavigate } from 'react-router-dom';  // Corrected 'react-router-don' to 'react-router-dom'
import { useAuth } from './authentication/AuthContext';  // Fixed: corrected file path and spelling of AuthContext

// Mocking useNavigate and useAuth hooks to avoid actual navigation and login logic in tests
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()  // Fixed: corrected syntax error in mocking
}));

jest.mock('./authentication/AuthContext', () => ({
  useAuth: jest.fn()  // Fixed: corrected syntax error in mocking
}));

describe('Login Component', () => {
  let mockLogin;
  let mockNavigate;

  // Before each test, initialize mock functions
  beforeEach(() => {
    mockLogin = jest.fn();  // Fixed: corrected variable name 'mocklogin' to 'mockLogin'
    mockNavigate = jest.fn();  // Fixed: corrected variable name 'nockNavigate' to 'mockNavigate'

    useAuth.mockReturnValue({ login: mockLogin });  // Corrected mock return value
    useNavigate.mockReturnValue(mockNavigate);  // Corrected mock return value
  });

  // Test to check if the form elements are rendered correctly
  test('renders username and password input fields and submit button', () => {
    render(<Login />);  // Fixed: corrected JSX syntax

    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument();  // Fixed: corrected 'getA11ByPlaceholderText' to 'getByPlaceholderText'
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();  // Fixed: corrected 'getAllByPlaceholderText' to 'getByPlaceholderText'
    expect(screen.getByText('Login')).toBeInTheDocument();  // Fixed: corrected 'getByText' syntax
  });

  // Test to check if the alert is shown when invalid credentials are entered
  test('shows alert if invalid credentials are entered', async () => {
    global.alert = jest.fn();  // Mocking the alert function

    render(<Login />);  // Fixed: corrected JSX syntax

    // Simulating the user typing in incorrect credentials
    fireEvent.change(screen.getByPlaceholderText('User Name'), { target: { value: 'wronguser' } });  // Fixed: corrected fireEvent syntax
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpass' } });  // Fixed: corrected fireEvent syntax
    fireEvent.click(screen.getByText('Login'));  // Fixed: corrected fireEvent syntax

    // Waiting for async operations and then checking if the alert was triggered
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Please enter valid username and password');  // Fixed: checking alert message
    });
  });

  // Test to check if the username and password state updates correctly when inputs change
  test('updates username and password state when inputs change', () => {
    render(<Login />);  // Fixed: corrected JSX syntax

    const usernameInput = screen.getByPlaceholderText('User Name');  // Fixed: variable name 'usernametnput' to 'usernameInput'
    const passwordInput = screen.getByPlaceholderText('Password');  // Fixed: variable name 'passwordinput' to 'passwordInput'

    // Simulating the user typing into the input fields
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });  // Fixed: corrected fireEvent syntax
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });  // Fixed: corrected fireEvent syntax

    // Verifying that the values in the inputs have been updated correctly
    expect(usernameInput.value).toBe('testuser');  // Fixed: corrected 'value' syntax
    expect(passwordInput.value).toBe('testpass');  // Fixed: corrected 'value' syntax
  });
});
