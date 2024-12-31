test('logs in successfully with correct credentials', async () => {
  mockLogin.mockResolvedValueOnce({ success: true }); // Simulate successful login

  render(<Login />);
  
  // Simulating the user typing correct credentials
  fireEvent.change(screen.getByPlaceholderText('User Name'), { target: { value: 'correctuser' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'correctpass' } });
  fireEvent.click(screen.getByText('Login'));

  // Waiting for async operations and verifying behavior
  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith('correctuser', 'correctpass'); // Verify credentials passed to login
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard'); // Verify navigation to the dashboard
  });
});
