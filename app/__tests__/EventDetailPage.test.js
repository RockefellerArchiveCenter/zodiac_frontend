import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventDetail from "@/events/[identifier]/page";
import { fetchData } from "../lib/fetchData";

// Mock the fetchData function
jest.mock("../lib/fetchData");

const mockEventData = {
  identifier: "f78742e5-6af9-4756-a94a-6cd297406d55",
  service: "test_service",
  outcome: "SUCCESS",
  last_modified: "2025-02-26T15:12:29.176000Z",
  message: "Package discovered.",
};

describe("Event Detail Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders package detail page", async () => {
    fetchData.mockImplementation((url) => {
      return Promise.resolve(mockEventData);
    });

    render(
      await EventDetail({
        params: { identifier: mockEventData.identifier },
      }),
    );

    expect(screen.getByText(mockEventData.service)).toBeInTheDocument();
    expect(
      screen.getByText(`STATUS: ${mockEventData.outcome}`),
    ).toBeInTheDocument();
    expect(screen.getByText(mockEventData.message)).toBeInTheDocument();
  });

  it("handles fetchData errors correctly", async () => {
    // Mock fetchData to return an error
    fetchData.mockImplementation(() =>
      Promise.resolve({ error: "Test error message" }),
    );

    render(
      await EventDetail({
        params: { identifier: mockEventData.identifier },
      }),
    );

    // Check if alert with error message is rendered
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });
});
