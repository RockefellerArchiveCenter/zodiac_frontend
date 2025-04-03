import { fetchData } from "@/lib/fetchData";
import Alert from "@/components/Alert";
import OutcomeBadge from "@/components/OutcomeBadge";
import SummaryList from "@/components/SummaryList";
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

  // Get the most recent event outcome for the package
  const outcome = eventsData[0]?.outcome;

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
        <OutcomeBadge outcome={outcome} />
      </div>
      {/* TODO: add missing data values */}
      <div className="card-list mb-30">
        <SummaryList
          title="Details"
          items={[
            { label: "Identifier", value: packageData.identifier },
            { label: "Package Origin", value: packageData.origin },
          ]}
        />
        <SummaryList
          title="External Identifiers"
          items={[
            { label: "ArchivesSpace Archival Object", value: null },
            { label: "ArchivesSpace Accession", value: null },
            { label: "Archivematica AIP UUID", value: null },
            {
              label: "Aurora Transfer",
              value: packageData.identifiers?.aurora_package,
            },
            { label: "Aurora Accession", value: null },
          ]}
        />
      </div>

      <h2>Package Events</h2>
      <Table columnsConfig={columnsConfig} data={eventsData} />
    </div>
  );
}
