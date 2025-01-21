import { render, screen, fireEvent } from '@testing-library/react';
import SimpleTestConfiguration from './SimpleTestConfiguration';

// Mock the props passed to SimpleTestConfiguration
const mockVerifyTestConfig = jest.fn();

describe('SimpleTestConfiguration Component', () => {
  
  test('renders the form fields correctly', () => {
    render(<SimpleTestConfiguration verifyTestConfig={mockVerifyTestConfig} />);
    
    // Check if the form fields are rendered
    expect(screen.getByLabelText(/Application Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Scenario Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Test Type:/i)).toBeInTheDocument();
  });
  
  test('shows alert if test type is not selected', () => {
    window.alert = jest.fn(); // Mock alert
    
    render(<SimpleTestConfiguration verifyTestConfig={mockVerifyTestConfig} />);
    
    // Submit the form without selecting a test type
    fireEvent.submit(screen.getByRole('form'));
    
    // Check if alert is called
    expect(window.alert).toHaveBeenCalledWith("Please select the type of test");
  });

  test('calls verifyTestConfig when test type is selected', () => {
    mockVerifyTestConfig.mockReturnValue(true); // Simulate a successful validation

    render(<SimpleTestConfiguration verifyTestConfig={mockVerifyTestConfig} />);
    
    // Select a test type
    fireEvent.change(screen.getByLabelText(/Test Type:/i), { target: { value: 'peak_test' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('form'));

    // Ensure verifyTestConfig is called
    expect(mockVerifyTestConfig).toHaveBeenCalled();
  });

  test('does not call verifyTestConfig if test type is not selected', () => {
    render(<SimpleTestConfiguration verifyTestConfig={mockVerifyTestConfig} />);
    
    // Submit the form without selecting a test type
    fireEvent.submit(screen.getByRole('form'));

    // Ensure verifyTestConfig is not called
    expect(mockVerifyTestConfig).not.toHaveBeenCalled();
  });
  
});
