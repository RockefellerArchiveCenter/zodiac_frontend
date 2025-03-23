// Homepage of app
import { fetchData } from '@/lib/fetchData';
import Table from '@/components/Table';

export default async function Home() {
  const data = await fetchData('/packages');
  const columnsConfig = [
    {
      title: 'Title',
      data: 'title',
      type: 'link',
      linkPrefix: '/packages/',
      identifierKey: 'identifier',
    },
    { title: 'Package ID', data: 'identifier' },
    { title: 'Origin', data: 'origin' },
    { title: 'Status', data: 'last_outcome' },
  ];

  return (
    <div>
      <h1>zodiac</h1>
      <p>Track ingest of packages and fix errors for born digital and digitized content.</p>
      <h2>Package Status</h2>
      <Table data={data} columnsConfig={columnsConfig} />
    </div>
  );
}
