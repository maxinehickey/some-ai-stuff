test('logs in successfully with correct credentials', async () => {
  // Simulate a successful login response from mockLogin
  mockLogin.mockResolvedValueOnce({ success: true });

  render(<Login />);

  // Simulate user entering correct credentials
  fireEvent.change(screen.getByPlaceholderText('User Name'), { target: { value: 'correctuser' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'correctpass' } });
  fireEvent.click(screen.getByText('Login'));

  // Wait for async operations and check the expected behavior
  await waitFor(() => {
    // Ensure the login function was called with the correct credentials
    expect(mockLogin).toHaveBeenCalledWith('correctuser', 'correctpass');
    expect(mockLogin).toHaveBeenCalledTimes(1); // Ensure login is only called once

    // Ensure navigation occurs to the expected route (e.g., dashboard)
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
