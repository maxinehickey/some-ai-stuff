test('logs in successfully with correct credentials', async () => {
  render(<Login />);

  fireEvent.change(screen.getByPlaceholderText('User Name'), { target: { value: 'correctuser' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'correctpass' } });
  fireEvent.click(screen.getByText('Login'));

  // Wait for any UI change that signifies a successful login, like showing a success message or redirecting
  await waitFor(() => {
    expect(screen.getByText('Login successful')).toBeInTheDocument();
  });
});
