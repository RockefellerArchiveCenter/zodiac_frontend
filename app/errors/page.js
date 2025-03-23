// /errors page
import { fetchData } from '@/lib/fetchData';
import Table from '@/components/Table';

export const metadata = {
  title: 'Package Errors - zodiac',
}

export default async function Errors() {
  const data = await fetchData('/events?outcome=FAILURE');
  const columnsConfig = [
    {
      title: 'Title',
      data: 'package_title',
      type: 'link',
      linkPrefix: '/packages/',
      identifierKey: 'package_identifier',
    },
    { title: 'Package ID', data: 'package_identifier' },
    { title: 'Origin', data: 'package_origin' },
    {
      title: 'Service Error',
      data: 'message',
      type: 'link',
      linkPrefix: '/events/',
      identifierKey: 'identifier',
    },
    { title: 'Date/Time', data: 'last_modified'},
  ];

  return (
    <div>
      <h1>Package Errors</h1>
      <Table columnsConfig={columnsConfig} data={data} />
    </div>
  );
}
