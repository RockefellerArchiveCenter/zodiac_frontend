import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmModal from '../components/ConfirmModal';


describe('Confirm Modal Component', () => {

  it('renders the modal', () => {

    const container = document.createElement('div')
    document.body.appendChild(container)

    render(<ConfirmModal
      appElement={container}
      className='modal--confirm' 
      isOpen={true}
      title='Confirm request'
      content='Are you sure you want to trigger this service?' />);

    expect(screen.getByText('Confirm request')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to trigger this service?')).toBeInTheDocument();
    expect(screen.getByText('Confirm request').parentElement.parentElement).toHaveClass('modal--confirm');
  });

});