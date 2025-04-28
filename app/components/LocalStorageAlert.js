"use client";

import { useEffect, useState } from "react";
import Alert from "./Alert";

const LocalStorageAlert = () => {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const rawMessage = localStorage.getItem("zodiacMessage");
    if (rawMessage) {
      try {
        const parsedMessage = JSON.parse(rawMessage);
        setMessage(parsedMessage.message || "");
        setColor(parsedMessage.color || "");
        setIcon(parsedMessage.icon || "");
        localStorage.removeItem("zodiacMessage");
      } catch (error) {
        console.error("Failed to parse zodiacMessage:", error);
        localStorage.removeItem("zodiacMessage"); // still remove it to avoid re-trigger
      }
    }
  }, []);

  if (!message) return null;

  return <Alert message={message} color={color} icon={icon} />;
};

export default LocalStorageAlert;
