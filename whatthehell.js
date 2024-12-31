import { login, logout, getCurrentUser } from './auth';

describe('Authentication Module', () => {
  afterEach(() => {
    // Ensure no user is logged in after each test
    logout();
  });

  test('should keep the user logged in until logged out', () => {
    // Log in with valid credentials
    const loginResult = login('user', 'pass');
    expect(loginResult).toEqual({
      success: true,
      user: { username: 'user' },
    });

    // Verify the user is still logged in
    expect(getCurrentUser()).toEqual({ username: 'user' });

    // Log out
    const logoutResult = logout();
    expect(logoutResult).toEqual({
      success: true,
      message: 'Logged out successfully',
    });

    // Verify the user is no longer logged in
    expect(getCurrentUser()).toBeNull();
  });

  test('should log in with correct credentials and fail with incorrect credentials', () => {
    // Test login with correct credentials
    const correctLoginResult = login('user', 'pass');
    expect(correctLoginResult).toEqual({
      success: true,
      user: { username: 'user' },
    });
    expect(getCurrentUser()).toEqual({ username: 'user' });

    // Log out after the valid login
    logout();

    // Test login with incorrect credentials
    const incorrectLoginResult = login('user', 'wrongpass');
    expect(incorrectLoginResult).toEqual({
      success: false,
      message: 'Invalid credentials',
    });
    expect(getCurrentUser()).toBeNull();
  });
});
