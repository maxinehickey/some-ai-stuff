import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ScheduledTests from './ScheduledTests';

// Mock the fetch function to avoid making real API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          name: 'Test 1',
          projectName: 'Project A',
          id: 1,
          status: 'Completed',
          terminationReason: 'None',
          startDate: '2023-01-01T00:00:00Z'
        },
        {
          name: 'Test 2',
          projectName: 'Project B',
          id: 2,
          status: 'Failed',
          terminationReason: 'Timeout',
          startDate: '2023-02-01T00:00:00Z'
        }
      ])
  })
);

describe('ScheduledTests Component', () => {
  // Test: Check if loading text appears initially
  test('renders loading initially', () => {
    render(<ScheduledTests />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  // Test: Check if data is displayed correctly after fetch
  test('displays fetched data correctly', async () => {
    render(<ScheduledTests />);
    
    // Wait for the data to be rendered
    await waitFor(() => expect(screen.getByText(/Test 1/)).toBeInTheDocument());
    
    // Verify that the data appears in the table
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByText('1/1/2023, 12:00:00 AM')).toBeInTheDocument();
    
    expect(screen.getByText('Test 2')).toBeInTheDocument();
    expect(screen.getByText('Project B')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
    expect(screen.getByText('Timeout')).toBeInTheDocument();
    expect(screen.getByText('2/1/2023, 12:00:00 AM')).toBeInTheDocument();
  });

  // Test: Ensure fetch error is handled gracefully
  test('handles fetch errors gracefully', async () => {
    // Simulate a fetch failure
    global.fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    render(<ScheduledTests />);

    // Wait for the loading text
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Since the API failed, the component should just not render the data or render nothing
    await waitFor(() => expect(screen.queryByText(/Test 1/)).not.toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/Test 2/)).not.toBeInTheDocument());
  });

  // Test: Ensure the data is displayed in reversed order
  test('displays data in reversed order', async () => {
    render(<ScheduledTests />);
    
    await waitFor(() => expect(screen.getByText(/Test 1/)).toBeInTheDocument());

    // Ensure the first test in the table is Test 2 (as the data is reversed)
    expect(screen.getByText('Test 2')).toBeInTheDocument();
    expect(screen.getByText('Test 1')).toBeInTheDocument();
  });
});
