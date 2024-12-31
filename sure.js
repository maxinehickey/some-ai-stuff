import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage Component', () => {

  test('renders HomePage with Home link', () => {
    render(<HomePage />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('renders the "Select Projects" title', () => {
    render(<HomePage />);
    expect(screen.getByText('Select Projects')).toBeInTheDocument();
  });

  test('clicking "Select Projects" toggles the arrow icon', () => {
    render(<HomePage />);
    
    // Check initial arrow icon (down arrow)
    const arrowIcon = screen.getByText('▼');
    expect(arrowIcon).toBeInTheDocument();

    // Simulate clicking on "Select Projects"
    fireEvent.click(screen.getByText('Select Projects'));

    // After clicking, the icon should change to up arrow
    const upArrowIcon = screen.getByText('▲');
    expect(upArrowIcon).toBeInTheDocument();
  });

  test('collapsing and expanding shows and hides "Completed Tests" text', () => {
    render(<HomePage />);
    
    // "Completed Tests" should not be visible initially
    expect(screen.queryByText('Completed Tests')).not.toBeInTheDocument();
    
    // Simulate clicking on "Select Projects" to expand
    fireEvent.click(screen.getByText('Select Projects'));
    
    // After expanding, "Completed Tests" should be visible
    expect(screen.getByText('Completed Tests')).toBeInTheDocument();
  });

});




import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

describe('HomePage Component', () => {

  test('clicking "Select Projects" toggles the arrow icon', () => {
    render(<HomePage />);
    
    // Initially, check if the down arrow icon is displayed
    const arrowDownIcon = screen.getByTestId('arrow-icon');
    expect(arrowDownIcon).toBeInTheDocument();
    expect(arrowDownIcon).toHaveClass('down'); // assuming you have a way to differentiate icons

    // Simulate clicking on "Select Projects"
    fireEvent.click(screen.getByText('Select Projects'));

    // After clicking, check if the up arrow icon is displayed
    const arrowUpIcon = screen.getByTestId('arrow-icon');
    expect(arrowUpIcon).toBeInTheDocument();
    expect(arrowUpIcon).toHaveClass('up'); // assuming the class for the up icon is 'up'
  });

});
