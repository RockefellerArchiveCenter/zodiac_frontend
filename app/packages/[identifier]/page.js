import { fetchData } from "@/lib/fetchData";
import Alert from "@/components/Alert";
import Badge from "@/components/Badge";
import { SummaryList, SummaryListItem } from "@/components/SummaryList";
import Table from "@/components/Table";

export const metadata = {
  title: "Package Details - Zodiac",
};

export default async function PackageDetail({ params }) {
  const { identifier } = await params;

  const [eventsData, packageData] = await Promise.all([
    fetchData(`/packages/${identifier}/events`),
    fetchData(`/packages/${identifier}`),
  ]);

  const error = eventsData.error || packageData.error;

  // Get the most recent event outcome and set the badge color and text
  // based on the last event
  const outcome = eventsData[0]?.outcome;

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
      {error && <Alert message={error} />}

      <h1>Package {packageData.title ? `: ${packageData.title}` : ""}</h1>

      <div className="mb-30">
        <Badge color={badgeColor} text={badgeText} />
      </div>
      {/* TODO: add missing data values */}
      <div className="card-list mb-30">
        <SummaryList title="Details">
          <SummaryListItem label="Identifier" value={packageData.identifier} />
          <SummaryListItem label="Package Origin" value={packageData.origin} />
          <SummaryListItem label="Package File Path" value={null} />
        </SummaryList>
        <SummaryList title="External Identifiers">
          <SummaryListItem label="ArchivesSpace Archival Object" value={null} />
          <SummaryListItem label="ArchivesSpace Accession" value={null} />
          <SummaryListItem label="Archivematica AIP UUID" value={null} />
          <SummaryListItem
            label="Aurora Transfer"
            value={packageData.identifiers?.aurora_package}
          />
          <SummaryListItem label="Aurora Accession" value={null} />
        </SummaryList>
      </div>

      <h2>Package Events</h2>
      <Table columnsConfig={columnsConfig} data={eventsData} />
    </div>
  );
}
