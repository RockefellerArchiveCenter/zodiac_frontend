import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badge from '../components/Badge';

describe('Badge Component', () => {

  // Test if the table renders columns and data
  it('renders the badge', () => {

    render(
    <Badge 
        color='orange'
        text='Badge text'
         />);

    const badge = screen.getByText('Badge text')
    expect(badge).toBeInTheDocument()
    expect(badge.className).toBe('badge badge--orange')
  });

});