import { render, screen } from '@testing-library/react';
import Table from '../components/Table';

jest.mock('../lib/fetchData');  // Mock the fetchData function

describe('Table Component', () => {

  // Test if the table renders columns and data
  it('renders the table', () => {
    const columnsConfig = [
      { title: 'Package ID', data: 'identifier' },
    ];
    const data = [{ identifier: '8bf992c0-1547-403a-93d4-ac531e7ed080' }];

    render(<Table columnsConfig={columnsConfig} data={data} />);

    expect(screen.getByText('Package ID')).toBeInTheDocument();
    expect(screen.getByText('8bf992c0-1547-403a-93d4-ac531e7ed080')).toBeInTheDocument();         // Data cell
  });

  // TODO: Test if data is fetched and the correct number of rows are displayed

  //TODO: Test if an error message is displayed if data fetching fails

});