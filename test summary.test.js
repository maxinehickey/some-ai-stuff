import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CollapsibleBar from './CollapsibleBar';

describe('CollapsibleBar Component', () => {
  test('renders the bar title', () => {
    render(<CollapsibleBar barTitle="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('toggles content visibility on click', () => {
    render(
      <CollapsibleBar 
        barTitle="Test Title" 
        component={<div>Collapsible Content</div>} 
      />
    );

    const bar = screen.getByText('Test Title');
    fireEvent.click(bar);
    expect(screen.getByText('Collapsible Content')).toBeInTheDocument();

    fireEvent.click(bar);
    expect(screen.queryByText('Collapsible Content')).not.toBeInTheDocument();
  });
});
