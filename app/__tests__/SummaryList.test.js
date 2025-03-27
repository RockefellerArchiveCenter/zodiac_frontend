import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {SummaryList, SummaryListItem} from '../components/SummaryList';

describe('Summary List Component', () => {

  it('renders the summary list with title', () => {

    render(
        <SummaryList title="Summary List">
            <SummaryListItem label="Package identifier" value="85e5982-b111-4dea-88f0-102c3d0bbffc" />
            <SummaryListItem label="Package origin" value="Aurora"/>
        </SummaryList>);

        expect(screen.getByText('Summary List')).toBeInTheDocument()
        expect(screen.getByText('85e5982-b111-4dea-88f0-102c3d0bbffc')).toBeInTheDocument()
        expect(screen.getByText('Package origin')).toBeInTheDocument()

  });

});