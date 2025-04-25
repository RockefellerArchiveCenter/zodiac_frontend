"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";

function rerunService(eventData) {
  console.log(eventData);
  // TODO: Implement rerun service
}

const RerunService = ({ eventData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button
        type="button"
        color="blue"
        size="md"
        label="Rerun service"
        handleClick={() => setIsOpen(!isOpen)}
      />
      <ConfirmModal
        isOpen={isOpen}
        toggleModal={() => setIsOpen(false)}
        title="Rerun service"
        content={
          <>
            <p>
              Do you want to trigger {eventData.service} to run again for
              package {eventData.identifier}?
            </p>
            <Button
              type="button"
              color="blue"
              size="md"
              label="Run service"
              handleClick={() => {
                rerunService(eventData);
                router.push(`/packages/${eventData.package_identifier}`);
              }}
            />
            <Button
              type="button"
              color="orange"
              size="md"
              label="Cancel"
              handleClick={() => setIsOpen(!isOpen)}
            />
          </>
        }
      />
    </>
  );
};

export default RerunService;
