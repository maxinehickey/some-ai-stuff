test('shows alert if correct credentials are entered', async () => {
  global.alert = jest.fn();

  render(<Login />);

  fireEvent.change(screen.getByPlaceholderText('User Name'), { target: { value: 'correctuser' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'correctpass' } });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(global.alert).toHaveBeenCalledWith('Login successful');
  });
});
