"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";

function rerunService(service, package_id) {
  const postData = {
    service: service,
    package_id: package_id,
  };
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/restart-service/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
                rerunService(eventData.service, eventData.package_identifier);
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
