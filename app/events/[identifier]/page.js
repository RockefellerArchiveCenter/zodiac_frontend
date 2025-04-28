import { fetchData } from "@/lib/fetchData";
import Alert from "@/components/Alert";
import LocalStorageAlert from "@/components/LocalStorageAlert";
import RerunService from "@/components/RerunService";
import OutcomeBadge from "@/components/OutcomeBadge";
import SummaryList from "@/components/SummaryList";
import Link from "next/link";

export const metadata = {
  title: "Event Details - Zodiac",
};

export default async function EventDetail({ params }) {
  const { identifier } = await params;
  const eventData = await fetchData(`/events/${identifier}`);

  return (
    <div>
      <h1>Event Details</h1>

      <LocalStorageAlert />

      {eventData.error ? (
        <>
          <Alert message={eventData.error} />
          <p className="mt-30">
            No event data is available. See error message above.
          </p>
        </>
      ) : (
        <>
          <div className="mb-50">
            <OutcomeBadge outcome={eventData.outcome} />
          </div>
          <SummaryList
            className="card card--container mb-30"
            items={[
              {
                label: "Package Title",
                value: eventData.package_title,
              },
              {
                label: "Package Identifier",
                value: (
                  <Link href={`/packages/${eventData.package_identifier}`}>
                    {eventData.package_identifier}
                  </Link>
                ),
              },
              { label: "Service", value: eventData.service },
              {
                label: "Message",
                value: `${eventData.message} ${eventData.traceback ? eventData.traceback : ""}`,
              },
            ]}
          />
          {eventData.outcome == "FAILURE" && (
            <RerunService eventData={eventData} />
          )}
        </>
      )}
    </div>
  );
}
