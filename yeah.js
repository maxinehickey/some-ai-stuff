test('calls handleLogin function on successful login', async () => {
  const handleLogin = jest.fn();
  
  render(<Login onLogin={handleLogin} />);

  fireEvent.change(screen.getByPlaceholderText('User Name'), { target: { value: 'correctuser' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'correctpass' } });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(handleLogin).toHaveBeenCalledWith('correctuser', 'correctpass');
  });
});
