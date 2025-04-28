"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";

export function setLocalStorage(message, color, icon) {
  localStorage.setItem(
    "zodiacMessage",
    JSON.stringify({
      message: message,
      color: color,
      icon: icon,
    }),
  );
}

export function rerunService(service, package_id, router) {
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
    .then((resp) => {
      if (resp.ok) {
        setLocalStorage(
          "The request to rerun the service has been received. It may take a few minutes for a notification from this service to appear. Please refresh the page for status updates",
          "blue",
          "check_circle_outline",
        );
        router.push(`/packages/${package_id}`);
      } else {
        resp.json().then((data) => {
          localStorage.setItem(
            "zodiacMessage",
            JSON.stringify({
              message: data,
              color: "orange",
              icon: "error_outline",
            }),
          );
          window.location.reload();
        });
      }
    })
    .catch((error) => {
      localStorage.setItem(
        "zodiacMessage",
        JSON.stringify({
          message: String(error),
          color: "orange",
          icon: "error_outline",
        }),
      );
      window.location.reload();
    });
}

const RerunService = ({ eventData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button
        type="button"
        className="btn--blue btn--md"
        label="Rerun service"
        handleClick={() => setIsOpen(!isOpen)}
      />
      <ConfirmModal
        isOpen={isOpen}
        toggleModal={() => setIsOpen(false)}
        title={`Rerun ${eventData.service}`}
        content={
          <>
            <p>
              Do you want to trigger {eventData.service} to run again for
              package {eventData.identifier}?
            </p>
            <Button
              type="button"
              className="btn--blue btn--md mr-20"
              label="Run service"
              handleClick={() => {
                rerunService(
                  eventData.service,
                  eventData.package_identifier,
                  router,
                );
              }}
            />
            <Button
              type="button"
              className="btn--orange btn--md"
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
