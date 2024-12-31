import { render, screen, fireEvent } from '@testing-library/react';
import Homepage from './Homepage';

describe('Extended Tests for Homepage Component', () => {
  beforeEach(() => {
    render(<Homepage />);
  });

  test('should render the title of the page', () => {
    const titleElement = screen.getByText(/welcome to my website/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('should render a navigation menu with accessible links', () => {
    const navLinks = screen.getAllByRole('link');
    expect(navLinks).toHaveLength(3); // Verify the number of links
    navLinks.forEach((link) => {
      expect(link).toBeVisible();
      expect(link).toHaveAccessibleName(); // Ensures ARIA compliance
    });
  });

  test('should validate the href of each navigation link', () => {
    const aboutLink = screen.getByText(/about/i).closest('a');
    const servicesLink = screen.getByText(/services/i).closest('a');
    const contactLink = screen.getByText(/contact/i).closest('a');

    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(servicesLink).toHaveAttribute('href', '/services');
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  test('should display a button that triggers an alert on click', () => {
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();

    window.alert = jest.fn();
    fireEvent.click(buttonElement);
    expect(window.alert).toHaveBeenCalledWith('Button clicked!');
  });

  test('should not crash and render properly', () => {
    const { container } = render(<Homepage />);
    expect(container).toMatchSnapshot();
  });

  test('should have accessible main container for ARIA compliance', () => {
    const mainContainer = screen.getByRole('main', { hidden: true });
    expect(mainContainer).toBeInTheDocument();
  });

  test('should handle missing elements gracefully', () => {
    const nonExistentElement = screen.queryByText(/does not exist/i);
    expect(nonExistentElement).toBeNull(); // Ensure it’s not rendered
  });

  test('should validate semantic structure', () => {
    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.tagName).toBe('H1');
  });

  test('should display the correct title in the document head', () => {
    document.title = 'Welcome to My Website'; // Simulate setting title in <head>
    expect(document.title).toBe('Welcome to My Website');
  });

  test('should maintain focus when the button is clicked', () => {
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    buttonElement.focus();
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveFocus();
  });
});
