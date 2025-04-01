import { fetchData } from "@/lib/fetchData";
import Alert from "@/components/Alert";
import Table from "@/components/Table";
import Badge from "@/components/Badge";

export const metadata = {
  title: "Package Details - Zodiac",
};

export default async function PackageDetail({ params }) {
  const { identifier } = await params;

  const data = await fetchData(`/packages/${identifier}/events`);

  // Get the most recent event outcome and set the badge color and text
  // based on the last event
  const outcome = data[0]?.outcome;

  let badgeColor = "light-blue";
  let badgeText = "IN PROCESS";

  if (outcome === "SUCCESS") {
    badgeColor = "blue";
    badgeText = outcome;
  } else if (outcome === "FAILURE") {
    badgeColor = "orange";
    badgeText = outcome;
  }

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
      <div className="mb-30">
      <Badge color={badgeColor} text={badgeText} />
      </div>
      <Table columnsConfig={columnsConfig} data={data} />
    </div>
  );
}
