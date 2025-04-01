import { fetchData } from "@/lib/fetchData";
import Alert from "@/components/Alert";
import Table from "@/components/Table";

export const metadata = {
  title: "Package Details - Zodiac",
};

export default async function PackageDetail({ params }) {
  const { identifier } = await params;

  const data = await fetchData(`/packages/${identifier}/events`);
  const columnsConfig = [
    {
      title: "Service",
      data: "service",
      type: "link",
      linkPrefix: "/events/",
      identifierKey: "identifier",
    },
    { title: "Status", data: "outcome" },
    { title: "Date/Time", data: "last_modified" },
    { title: "Message", data: "message" },
  ];

  return (
    <div>
      {data.error && <Alert message={data.error} />}
      <h1>Package Details</h1>
      <Table columnsConfig={columnsConfig} data={data} />
    </div>
  );
}
