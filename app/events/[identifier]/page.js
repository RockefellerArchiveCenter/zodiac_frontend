import { fetchData } from "@/lib/fetchData";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";
import OutcomeBadge from "@/components/OutcomeBadge";
import SummaryList from "@/components/SummaryList";
import Link from "next/link";

// async function rerunService() {
//   // TODO: Implement rerun service
// }

export const metadata = {
  title: "Event Details - Zodiac",
};

export default async function EventDetail({ params }) {
  const { identifier } = await params;
  const eventData = await fetchData(`/events/${identifier}`);

  return (
    <div>
      <h1>Event Details</h1>

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
          <Button
            type="button"
            color="blue"
            size="md"
            label="Rerun service"
            // TODO: Implement modal open
            // handleClick={ }
          />
          {/* TODO: Implement modal open */}
          {/* <ConfirmModal
            isOpen={isOpen}
            toggleModal={() => setIsOpen(false)}
            title="Rerun service"
            message={`Do you want to trigger ${eventData.service} to run again for package ${eventData.identifier}?`}
          /> */}
        </>
      )}
    </div>
  );
}
