import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/Button';

describe('Button Component', () => {

  // Test if the table renders columns and data
  it('renders the button', () => {

    render(
    <Button 
        type='submit'
        color='blue'
        size='md'
        handleClick={jest.fn()}
        ariaLabel='Submit form'
        ariaHasPopup={false}
        ariaExpanded={true}
        ariaPressed={true}
        disabled={false}
        label='Submit form'
         />);
    
        const button = screen.getByText('Submit form')
        expect(button).toBeInTheDocument()
        expect(button.className).toBe('btn btn--blue btn--md')
        expect(button.type).toBe('submit')
        expect(button.getAttribute('aria-label')).toBe('Submit form')
        expect(button.getAttribute('aria-haspopup')).toBe('false')
        expect(button.getAttribute('aria-expanded')).toBe('true')
        expect(button.getAttribute('aria-pressed')).toBe('true')
        expect(button.disabled).toBeFalsy()
    
  });

});