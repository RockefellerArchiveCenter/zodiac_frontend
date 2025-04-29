"use client";

import { useEffect, useState } from "react";
import Alert from "./Alert";

// Retrieves a message from localStorage and displays it as an alert.
const LocalStorageAlert = () => {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const rawMessage = localStorage.getItem("zodiacMessage");
    if (rawMessage) {
      // Parse the message from localStorage
      try {
        const parsedMessage = JSON.parse(rawMessage);
        setMessage(parsedMessage.message || "");
        setColor(parsedMessage.color || "");
        setIcon(parsedMessage.icon || "");
        localStorage.removeItem("zodiacMessage");
      } catch (error) {
        console.error("Failed to parse zodiacMessage:", error);
        localStorage.removeItem("zodiacMessage"); // if error, still remove it to avoid re-trigger
      }
    }
  }, []);

  if (!message) return null;
  return <Alert message={message} color={color} icon={icon} />;
};

export default LocalStorageAlert;
