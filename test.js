import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Mocking the useNavigate and useAuth hooks
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('./AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Login Component', () => {
  let mockLogin;
  let mockNavigate;

  beforeEach(() => {
    // Reset mocks before each test
    mockLogin = jest.fn();
    mockNavigate = jest.fn();

    useAuth.mockReturnValue({ login: mockLogin });
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders username and password input fields and submit button', () => {
    render(<Login />);

    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('shows alert if invalid credentials are entered', async () => {
    // Mocking the alert function
    global.alert = jest.fn();

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('User Name'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Please enter valid username and password');
    });
  });

  test('navigates to homePage on successful login', async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('User Name'), { target: { value: 'ptafuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'WelcOme' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();  // Check if login function was called
      expect(mockNavigate).toHaveBeenCalledWith('/homePage');  // Check if navigate was called with correct path
    });
  });

  test('updates username and password state when inputs change', () => {
    render(<Login />);

    const usernameInput = screen.getByPlaceholderText('User Name');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpass');
  });
});
