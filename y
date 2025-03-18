import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar Component', () => {
    test('renders the navbar', () => {
        render(<Navbar collapseNavbar={false} toggleNavbarDiv={() => {}} />);
        expect(screen.getByText(/Performance Test Automation Framework/i)).toBeInTheDocument();
    });

    test('toggles dark mode', () => {
        render(<Navbar collapseNavbar={false} toggleNavbarDiv={() => {}} />);
        const darkModeButton = screen.getByRole('button', { name: /dark mode/i });
        fireEvent.click(darkModeButton);
        expect(document.body).toHaveClass('dark-mode'); // Assuming dark mode applies a class
    });

    test('toggles navbar visibility', () => {
        const toggleNavbarMock = jest.fn();
        render(<Navbar collapseNavbar={false} toggleNavbarDiv={toggleNavbarMock} />);
        const hamburger = screen.getByRole('button', { name: /menu/i }); // Assuming you add an aria-label to the hamburger div
        fireEvent.click(hamburger);
        expect(toggleNavbarMock).toHaveBeenCalled();
    });
});
