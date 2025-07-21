import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import RerunService from "@/components/RerunService";
import { useRouter } from "next/navigation";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const originalLocation = window.location;

beforeEach(() => {
  const container = document.createElement("div");
  container.id = "root";
  document.body.appendChild(container);

  useRouter.mockReturnValue({ push: mockPush });
  Storage.prototype.setItem = jest.fn();

  // Mock window.location.reload
  delete window.location;
  window.location = { reload: jest.fn() };
});

afterAll(() => {
  window.location = originalLocation;
});

const mockEventData = {
  identifier: "f78742e5-6af9-4756-a94a-6cd297406d55",
  service: "test_service",
  outcome: "FAILURE",
  last_modified: "2025-02-26T15:12:29.176000Z",
  message: "BagIt Validation.",
  package_identifier: "f78742e5-6af9-4756-a94a-6cd297406d51",
};

describe("RerunService Component", () => {
  it("opens the modal on button click", () => {
    render(<RerunService eventData={mockEventData} />);
    fireEvent.click(screen.getByRole("button", { name: "Rerun service" }));
    expect(
      screen.getByText(`Rerun ${mockEventData.service}`),
    ).toBeInTheDocument();
  });

  it("handles successful rerun", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
    });

    render(<RerunService eventData={mockEventData} />);
    fireEvent.click(screen.getByText("Rerun service"));
    fireEvent.click(screen.getByText("Run service"));

    await waitFor(() => {
      expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        "zodiacMessage",
        expect.stringContaining(
          "The request to rerun the service has been received",
        ),
      );
      expect(mockPush).toHaveBeenCalledWith(
        `/packages/${mockEventData.package_identifier}`,
      );
    });
  });

  it("handles server error response with JSON body", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve("Something went wrong"),
    });

    render(<RerunService eventData={mockEventData} />);
    fireEvent.click(screen.getByText("Rerun service"));
    fireEvent.click(screen.getByText("Run service"));

    await waitFor(() => {
      expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        "zodiacMessage",
        expect.stringContaining("Something went wrong"),
      );
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  it("handles fetch error", async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error("Network Error"));

    render(<RerunService eventData={mockEventData} />);
    fireEvent.click(screen.getByText("Rerun service"));
    fireEvent.click(screen.getByText("Run service"));

    await waitFor(() => {
      expect(Storage.prototype.setItem).toHaveBeenCalledWith(
        "zodiacMessage",
        expect.stringContaining("Network Error"),
      );
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  it("closes the modal on cancel", () => {
    render(<RerunService eventData={mockEventData} />);
    fireEvent.click(screen.getByText("Rerun service"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(
      screen.queryByText(`Do you want to trigger ${mockEventData.service}`),
    ).not.toBeInTheDocument();
  });
});
