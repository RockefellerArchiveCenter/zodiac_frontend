import { fetchData } from "@/lib/fetchData";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";
import OutcomeBadge from "@/components/OutcomeBadge";
import SummaryList from "@/components/SummaryList";

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
      {eventData.error && <Alert message={eventData.error} />}

      <h1>Event Details</h1>

      <div className="mb-50">
        <OutcomeBadge outcome={eventData.outcome} />
      </div>
      <SummaryList
        className="card card--container mb-30"
        items={[
          { label: "Package Identifier", value: eventData.identifier },
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
    </div>
  );
}
