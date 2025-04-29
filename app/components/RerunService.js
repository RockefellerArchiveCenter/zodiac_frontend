"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import ConfirmModal from "./ConfirmModal";

// Sets a message in localStorage to be displayed as an alert.
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

// Sends a post request to restart a service for a specific package.
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
    // If the request is successful, sets a success message in localStorage and redirects to the package page.
    .then((resp) => {
      if (resp.ok) {
        setLocalStorage(
          "The request to rerun the service has been received. It may take a few minutes for a notification from this service to appear. Please refresh the page for status updates",
          "blue",
          "check_circle_outline",
        );
        router.push(`/packages/${package_id}`);
        // If the request fails, sets an error message in localStorage and reloads the page.
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
    // If there is a network error, sets an error message in localStorage and reloads the page.
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

// RerunService component renders a button that opens a modal to confirm the rerun of a service.
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
