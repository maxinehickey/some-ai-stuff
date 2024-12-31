import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
import CollapsibleBar from '../../common-component/collapsible-bar/CollapsibleBar'; // Adjust path as needed
import ScheduledTests from '/scheduled-tests/Scheduledtests'; // Adjust path as needed
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

// Mocking the child components
jest.mock('../../common-component/collapsible-bar/CollapsibleBar', () => {
  return {
    __esModule: true,
    default: ({ children }) => <div>{children}</div>, // Mocked CollapsibleBar renders children
  };
});

jest.mock('/scheduled-tests/Scheduledtests', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked ScheduledTests</div>,
  };
});

describe('HomePage Component', () => {

  test('renders HomePage without crashing', () => {
    render(<HomePage />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('renders CollapsibleBar component', () => {
    render(<HomePage />);
    expect(screen.getByText(/Mocked ScheduledTests/i)).toBeInTheDocument();
  });

  test('toggles collapse on Select Projects click', () => {
    render(<HomePage />);
    
    // Assuming there's an element with the text "Select Projects"
    const toggleElement = screen.getByText(/Select Projects/i);
    
    // Initially, "Select Projects" should be rendered
    expect(toggleElement).toBeInTheDocument();
    
    // Simulate click to expand the section
    fireEvent.click(toggleElement);
    
    // After clicking, the CollapsibleBar should be visible
    expect(screen.getByText(/Mocked ScheduledTests/i)).toBeInTheDocument();
  });

  test('shows arrow down initially and changes to arrow up on click', () => {
    render(<HomePage />);
    
    const arrowDown = screen.getByText(MdOutlineKeyboardArrowDown);
    const arrowUp = screen.queryByText(MdOutlineKeyboardArrowUp);

    // Initially, the arrow down icon should be visible
    expect(arrowDown).toBeInTheDocument();
    expect(arrowUp).not.toBeInTheDocument();
    
    // Simulate click to expand the section
    fireEvent.click(screen.getByText(/Select Projects/i));

    // After expanding, the arrow up icon should appear
    expect(screen.getByText(MdOutlineKeyboardArrowUp)).toBeInTheDocument();
    expect(screen.queryByText(MdOutlineKeyboardArrowDown)).not.toBeInTheDocument();
  });
  
});
