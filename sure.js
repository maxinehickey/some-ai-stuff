import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

// Mocking the CollapsibleBar component
jest.mock('../../common-component/collapsible-bar/CollapsibleBar', () => {
  return {
    __esModule: true,
    default: ({ children }) => <div>{children}</div>, // Mocking CollapsibleBar rendering children
  };
});

describe('HomePage Component', () => {

  test('renders HomePage without crashing', () => {
    render(<HomePage />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('renders the "Select Projects" title', () => {
    render(<HomePage />);
    expect(screen.getByText(/Select Projects/i)).toBeInTheDocument();
  });

  test('shows the correct icon when the section is collapsed and expanded', () => {
    render(<HomePage />);
    
    // Check the initial icon (arrow down)
    const arrowDownIcon = screen.getByText(MdOutlineKeyboardArrowDown);
    expect(arrowDownIcon).toBeInTheDocument();

    // Simulate click to expand the section
    fireEvent.click(screen.getByText(/Select Projects/i));

    // After expanding, the icon should change to arrow up
    const arrowUpIcon = screen.getByText(MdOutlineKeyboardArrowUp);
    expect(arrowUpIcon).toBeInTheDocument();
  });

  test('collapsing and expanding the section shows and hides the completed tests section', () => {
    render(<HomePage />);
    
    // Initially, the "Completed Tests" section should not be visible
    expect(screen.queryByText(/Completed Tests/i)).not.toBeInTheDocument();
    
    // Simulate click to expand the section
    fireEvent.click(screen.getByText(/Select Projects/i));
    
    // After expanding, the "Completed Tests" section should be visible
    expect(screen.getByText(/Completed Tests/i)).toBeInTheDocument();
  });

  test('renders the correct background color and styling for Completed Tests', () => {
    render(<HomePage />);
    
    // Expand the section
    fireEvent.click(screen.getByText(/Select Projects/i));
    
    // Ensure the background color of the "Completed Tests" section is correct
    const completedTestsSection = screen.getByText(/Completed Tests/i).closest('div');
    expect(completedTestsSection).toHaveStyle('background-color: #1e81b0');
    expect(completedTestsSection).toHaveStyle('color: #FFFFFF');
  });
});
