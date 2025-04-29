import { render, screen } from "@testing-library/react";
import LocalStorageAlert from "@/components/LocalStorageAlert";
import "@testing-library/jest-dom";

describe("LocalStorageAlert", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders nothing when there is no message in localStorage", () => {
    render(<LocalStorageAlert />);
    const alert = screen.queryByRole("alert");
    expect(alert).not.toBeInTheDocument();
  });

  it("renders the Alert when message is in localStorage", () => {
    const messageData = {
      message: "Service successfully triggered",
      color: "blue",
      icon: "check_circle_outline",
    };

    localStorage.setItem("zodiacMessage", JSON.stringify(messageData));

    render(<LocalStorageAlert />);

    const alert = screen.getByText(messageData.message);
    expect(alert).toBeInTheDocument();
    expect(alert.parentElement.parentElement.className).toBe(
      `alert alert--${messageData.color}`,
    );
    expect(screen.getByText("check_circle_outline"));
  });

  it("removes the zodiacMessage from localStorage after rendering", () => {
    const messageData = {
      message: "Service successfully triggered",
      color: "blue",
      icon: "check_circle_outline",
    };

    localStorage.setItem("zodiacMessage", JSON.stringify(messageData));

    render(<LocalStorageAlert />);

    expect(localStorage.getItem("zodiacMessage")).toBeNull();
  });

  it("handles invalid JSON gracefully", () => {
    localStorage.setItem("zodiacMessage", "invalid json");

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<LocalStorageAlert />);

    const alert = screen.queryByRole("alert");
    expect(alert).not.toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
