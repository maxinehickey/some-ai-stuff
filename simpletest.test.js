import { render, screen, fireEvent } from '@testing-library/react';
import SimpleTestConfiguration from './SimpleTestConfiguration';

describe('SimpleTestConfiguration Component', () => {
  let verifyTestConfigMock;

  beforeEach(() => {
    verifyTestConfigMock = jest.fn();
  });

  it('renders the form correctly', () => {
    render(<SimpleTestConfiguration verifyTestConfig={verifyTestConfigMock} />);

    // Check if all form elements are rendered
    expect(screen.getByLabelText(/Application Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Scenario Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Test Type/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save Configs/i })).toBeInTheDocument();
  });

  it('displays an alert if no test type is selected', () => {
    window.alert = jest.fn(); // Mock alert

    render(<SimpleTestConfiguration verifyTestConfig={verifyTestConfigMock} />);

    fireEvent.submit(screen.getByRole('form'));

    expect(window.alert).toHaveBeenCalledWith('Please select the type of test');
    expect(verifyTestConfigMock).not.toHaveBeenCalled();
  });

  it('calls verifyTestConfig and handleForm on valid submission', () => {
    const handleFormMock = jest.fn();
    jest.mock('../foraltil', () => ({ handleForm: handleFormMock, mapData: jest.fn() }));

    render(<SimpleTestConfiguration verifyTestConfig={verifyTestConfigMock} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Application Name/i), {
      target: { value: 'Test App' },
    });
    fireEvent.change(screen.getByLabelText(/Scenario Name/i), {
      target: { value: 'Test Scenario' },
    });
    fireEvent.change(screen.getByLabelText(/Test Type/i), {
      target: { value: 'smoke_test' },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole('form'));

    expect(verifyTestConfigMock).toHaveBeenCalled();
    expect(handleFormMock).toHaveBeenCalled();
  });

  it('prevents submission if verifyTestConfig returns false', () => {
    verifyTestConfigMock.mockReturnValue(false);

    render(<SimpleTestConfiguration verifyTestConfig={verifyTestConfigMock} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Application Name/i), {
      target: { value: 'Test App' },
    });
    fireEvent.change(screen.getByLabelText(/Scenario Name/i), {
      target: { value: 'Test Scenario' },
    });
    fireEvent.change(screen.getByLabelText(/Test Type/i), {
      target: { value: 'smoke_test' },
    });

    // Submit the form
    fireEvent.submit(screen.getByRole('form'));

    expect(verifyTestConfigMock).toHaveBeenCalled();
    expect(screen.queryByText('Calling BE service')).not.toBeInTheDocument();
  });
});
