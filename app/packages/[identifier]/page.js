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
  const outcome = eventsData[0]?.outcome; // Get the most recent event outcome for the package
  const identifiers = packageData.identifiers || {};

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
      <h1>
        Package Details {packageData.title ? `: ${packageData.title}` : ""}
      </h1>

      {error ? (
        <>
          <Alert message={error} />
          <p className="mt-30">
            No package data is available. See error message above.
          </p>
        </>
      ) : (
        <>
          <div className="mb-50">
            <OutcomeBadge outcome={outcome} />
          </div>
          <SummaryList
            className="mb-50"
            items={[
              { label: "Package Identifier", value: packageData.identifier },
              { label: "Package Origin", value: packageData.origin },
            ]}
          />

          <h2>Package Events</h2>
          <div className="mb-50">
            <Table columnsConfig={columnsConfig} data={eventsData} />
          </div>

          <SummaryList
            className="card card--container mb-50"
            title="External Identifiers"
            items={[
              { label: "Aurora Transfer", value: identifiers.aurora_package },
              {
                label: "Aurora Accession",
                value: identifiers.aurora_accession,
              },
              {
                label: "Archivematica AIP UUID",
                value: identifiers.archivematica_uuid,
              },
              {
                label: "ArchivesSpace Accession",
                value: identifiers.archivesspace_accession,
              },
              {
                label: "ArchivesSpace Archival Object",
                value: identifiers.archivesspace_archival_object,
              },
            ]}
          />
        </>
      )}
    </div>
  );
}
